import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Button,
  Stack,
  Divider,
  Spinner,
  Tag,
  TagLabel,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMail, FiPhone, FiMapPin, FiUser } from "react-icons/fi";

const baseUrl = process.env.REACT_APP_APIURL || "http://localhost:8000/v1";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const labelColor = useColorModeValue("gray.500", "gray.400");
  const valueColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const accent = useColorModeValue("pink.500", "pink.300");
  const cardBorderColor = useColorModeValue("gray.100", "whiteAlpha.200");

  useEffect(() => {
    const token =
      localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users/userdata`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <Flex minH="70vh" align="center" justify="center" bg={pageBg}>
        <Stack align="center">
          <Spinner size="lg" />
          <Text fontSize="sm" color="gray.500">
            Loading your profile...
          </Text>
        </Stack>
      </Flex>
    );
  }

  if (!user) return null;

  return (
    <Box bg={pageBg} py={{ base: 6, md: 10 }} px={{ base: 4, md: 6 }}>
      <Box maxW="1200px" mx="auto">
        {/* Heading */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          gap={4}
          mb={8}
        >
          <Box>
            <Heading fontSize={{ base: "xl", md: "3xl" }}>
              My Profile
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Manage your personal information and account details.
            </Text>
          </Box>
        </Flex>

        {/* Card */}
        <Box
          bg={cardBg}
          borderRadius="2xl"
          boxShadow="xl"
          borderWidth="1px"
          borderColor={cardBorderColor}
          overflow="hidden"
        >
          {/* Gradient Header */}
          <Box
            bgGradient="linear(to-r, pink.500, purple.500)"
            px={{ base: 6, md: 8 }}
            py={{ base: 6, md: 8 }}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              align="center"
              gap={6}
              textAlign={{ base: "center", md: "left" }}
            >
              <Avatar
                name={user.name}
                size={{ base: "lg", md: "xl" }}
                src={user.profileimage || undefined}
                border="3px solid rgba(255,255,255,0.7)"
              />

              <Box color="white" w="100%">
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  align="center"
                  gap={3}
                  mb={2}
                  justify={{ base: "center", md: "flex-start" }}
                >
                  <Heading fontSize={{ base: "lg", md: "2xl" }}>
                    {user.name}
                  </Heading>

                  {user.role && (
                    <Tag
                      size="sm"
                      borderRadius="full"
                      bg="whiteAlpha.900"
                      color="pink.600"
                    >
                      <TagLabel textTransform="capitalize">
                        {user.role}
                      </TagLabel>
                    </Tag>
                  )}
                </Flex>

                {/* FIXED ALIGNMENT */}
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  gap={{ base: 2, sm: 6 }}
                  align="center"
                  justify={{ base: "center", md: "flex-start" }}
                >
                  <InfoInline icon={FiMail} value={user.email} />
                  {user.phone && (
                    <InfoInline icon={FiPhone} value={user.phone} />
                  )}
                </Flex>
              </Box>
            </Flex>
          </Box>

          {/* Body */}
          <Box px={{ base: 6, md: 8 }} py={{ base: 6, md: 8 }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <ProfileField
                label="Full Name"
                icon={FiUser}
                value={user.name}
                accent={accent}
                valueColor={valueColor}
                labelColor={labelColor}
              />

              <ProfileField
                label="Email"
                icon={FiMail}
                value={user.email}
                accent={accent}
                valueColor={valueColor}
                labelColor={labelColor}
              />

              <ProfileField
                label="Phone"
                icon={FiPhone}
                value={user.phone || "Not added yet"}
                accent={accent}
                valueColor={valueColor}
                labelColor={labelColor}
              />

              <ProfileField
                label="Address"
                icon={FiMapPin}
                value={user.address || "Not added yet"}
                accent={accent}
                valueColor={valueColor}
                labelColor={labelColor}
              />
            </SimpleGrid>

            <Divider my={8} />

            <Flex
              direction={{ base: "column", sm: "row" }}
              justify="space-between"
              align={{ base: "stretch", sm: "center" }}
              gap={4}
            >
              <Text fontSize="sm" color="gray.500">
                Keep your profile information up to date.
              </Text>

              <Button
                onClick={() => navigate("/edit-profile")}
                borderRadius="full"
                w={{ base: "100%", sm: "auto" }}
                px={8}
                bg={accent}
                _hover={{ bg: "pink.600" }}
                color="white"
              >
                Edit Profile
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* 🔥 PERFECT INLINE ALIGNMENT */
function InfoInline({ icon, value }) {
  return (
    <Flex align="center" gap={2}>
      <Icon as={icon} boxSize="14px" />
      <Text
        fontSize="sm"
        lineHeight="1"
        m="0"
        display="flex"
        alignItems="center"
      >
        {value}
      </Text>
    </Flex>
  );
}

/* 🔥 FIELD COMPONENT */
function ProfileField({
  label,
  icon,
  value,
  accent,
  valueColor,
  labelColor,
}) {
  return (
    <Box>
      <Text
        fontSize="xs"
        textTransform="uppercase"
        color={labelColor}
        mb={1}
      >
        {label}
      </Text>

      <Flex align="center" gap={2}>
        <Icon as={icon} boxSize="14px" color={accent} />
        <Text
          fontWeight="500"
          color={valueColor}
          lineHeight="1"
          m="0"
          display="flex"
          alignItems="center"
        >
          {value}
        </Text>
      </Flex>
    </Box>
  );
}
