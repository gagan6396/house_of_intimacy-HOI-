import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Button,
  Divider,
  useToast,
  Tag,
  TagLabel,
  SimpleGrid,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = process.env.REACT_APP_APIURL || "http://localhost:8000/v1";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    role: "",
    profileimage: "",
  });

  const toast = useToast();
  const navigate = useNavigate();

  // 🎨 SAME COLOR SYSTEM
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const labelColor = useColorModeValue("gray.500", "gray.400");
  const accent = useColorModeValue("pink.500", "pink.300");
  const cardBorderColor = useColorModeValue("gray.100", "whiteAlpha.200");

  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users/userdata`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${baseUrl}/users/userdata`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "Profile updated successfully",
        status: "success",
        duration: 3000,
      });

      navigate("/account/profile");
    } catch (err) {
      toast({
        title: "Update failed",
        description: err.response?.data?.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Box bg={pageBg} pt="20px" pb={10} px={2}>
      <Box maxW="1200px" mx="auto">
        {/* Heading */}
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Heading fontSize={{ base: "2xl", md: "3xl" }}>
              Edit Profile
            </Heading>
            <Text color="gray.500" mt={1}>
              Update your personal information.
            </Text>
          </Box>
        </Flex>

        {/* Card */}
        <Box
          bg={cardBg}
          borderRadius="2xl"
          boxShadow="xl"
          overflow="hidden"
          borderWidth="1px"
          borderColor={cardBorderColor}
        >
          {/* Gradient Banner */}
          <Box
            bgGradient="linear(to-r, pink.500, purple.500)"
            px={{ base: 6, md: 8 }}
            py={6}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              gap={5}
            >
              <Avatar
                name={formData.name}
                size="xl"
                bg="whiteAlpha.800"
                color="pink.500"
                boxShadow="lg"
                border="3px solid rgba(255,255,255,0.7)"
                src={formData.profileimage || undefined}
              />

              <Box color="white">
                <Flex gap={3} mb={1} direction={{ base: "column", md: "row" }}>
                  <Heading fontSize={{ base: "xl", md: "2xl" }}>
                    {formData.name}
                  </Heading>

                  {formData.role && (
                    <Tag
                      size="sm"
                      borderRadius="full"
                      bg="whiteAlpha.900"
                      color="pink.600"
                    >
                      <TagLabel textTransform="capitalize">
                        {formData.role}
                      </TagLabel>
                    </Tag>
                  )}
                </Flex>

                <Text fontSize="sm" opacity={0.9}>
                  {formData.email}
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Form Section */}
          <Box px={{ base: 6, md: 8 }} py={6}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl>
                <FormLabel color={labelColor}>Full Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  focusBorderColor="pink.400"
                />
              </FormControl>

              <FormControl isDisabled>
                <FormLabel color={labelColor}>Email</FormLabel>
                <Input value={formData.email} />
              </FormControl>

              <FormControl>
                <FormLabel color={labelColor}>Phone</FormLabel>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  focusBorderColor="pink.400"
                />
              </FormControl>

              <FormControl>
                <FormLabel color={labelColor}>Address</FormLabel>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  focusBorderColor="pink.400"
                />
              </FormControl>
            </SimpleGrid>

            <Divider my={6} />

            <Flex
              direction={{ base: "column", sm: "row" }}
              justify="space-between"
              align={{ base: "stretch", sm: "center" }}
              gap={3}
            >
              <Text fontSize="sm" color="gray.500">
                Make sure your details are correct before saving.
              </Text>

              <Flex gap={3}>
                <Button
                  variant="outline"
                  borderRadius="full"
                  onClick={() => navigate("/account/profile")}
                >
                  Cancel
                </Button>

                <Button
                  borderRadius="full"
                  bg={accent}
                  _hover={{ bg: "pink.600" }}
                  color="white"
                  onClick={handleSubmit}
                >
                  Save Changes
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
