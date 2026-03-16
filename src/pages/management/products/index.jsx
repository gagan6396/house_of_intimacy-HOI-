// src/pages/management/products/index.jsx
import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Spinner,
  Text,
  Flex,
  Tag,
  TagLabel,
  useToast,
  useColorModeValue,
  Button,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import ReactPaginate from 'react-paginate';

/* ─────────────────────────────────────────────
   Inline responsive-table overrides.
   SuperResponsiveTable adds a `data-label` attr
   to every <Td> and switches to a card layout
   below 640 px. These styles polish that view.
───────────────────────────────────────────── */
const globalStyles = `
  /* ── Scrollable wrapper on medium screens ── */
  .srt-scroll-wrapper {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* ── Base table layout ── */
  .super-responsive-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: auto;
  }

  /* ── Stacked / card mode (≤ 640 px) ── */
  @media (max-width: 640px) {
    .super-responsive-table thead { display: none; }

    .super-responsive-table tbody tr {
      display: block;
      margin-bottom: 16px;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    }

    .super-responsive-table tbody td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px !important;
      border-bottom: 1px solid rgba(0,0,0,0.06);
      font-size: 14px;
    }

    .super-responsive-table tbody td:last-child {
      border-bottom: none;
    }

    /* Label injected by SuperResponsiveTable */
    .super-responsive-table tbody td::before {
      content: attr(data-label);
      font-weight: 700;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #6B46C1;
      margin-right: 12px;
      flex-shrink: 0;
      min-width: 90px;
    }

    /* Action buttons: stack full-width */
    .super-responsive-table tbody td:last-child {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }

  /* ── Tablet (641 – 1024 px): horizontal scroll ── */
  @media (min-width: 641px) and (max-width: 1024px) {
    .super-responsive-table th,
    .super-responsive-table td {
      font-size: 13px;
      padding: 10px 10px !important;
    }
  }

  /* ── Pagination ── */
  .pagination {
    display: flex;
    list-style: none;
    gap: 6px;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    justify-content: center;
  }
  .page-item .page-link {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
    padding: 0 10px;
    border-radius: 8px;
    border: 1px solid #CBD5E0;
    background: #fff;
    color: #4A5568;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    text-decoration: none;
  }
  .page-item .page-link:hover { background: #EDF2F7; }
  .page-item.active .page-link {
    background: #6B46C1;
    color: #fff;
    border-color: #6B46C1;
  }
  .page-item.disabled .page-link {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const baseUrl = process.env.REACT_APP_APIURL || 'http://localhost:8000/v1';
const apiRoot = baseUrl.replace(/\/v1$/, '');

const Products = () => {
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount]     = useState(0);
  const itemsPerPage = 10;

  const toast    = useToast();
  const navigate = useNavigate();

  const pageBg       = useColorModeValue('gray.50',  'gray.900');
  const cardBg       = useColorModeValue('white',    'gray.800');
  const headerBg     = useColorModeValue('#6B46C1',  '#553C9A');
  const rowHoverBg   = useColorModeValue('#F7F4FF',  '#2D2450');
  const borderColor  = useColorModeValue('purple.100','gray.700');

  /* ── inject styles once ── */
  useEffect(() => {
    const id = 'srt-override-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = globalStyles;
      document.head.appendChild(el);
    }
  }, []);

  /* ── fetch products ── */
  const fetchProducts = useCallback(async (pageIndex = 0) => {
    setLoading(true);
    try {
      const page = pageIndex + 1;
      const res  = await axios.get(
        `${baseUrl}/products?page=${page}&limit=${itemsPerPage}`,
      );

      const productsArray =
        res.data.data || res.data.products || res.data.items || [];
      setProducts(productsArray);

      const totalPagesFromPagination = res.data.pagination?.totalPages;
      const totalPagesDirect         = res.data.totalPages;
      let finalPageCount = 0;

      if (typeof totalPagesFromPagination === 'number') {
        finalPageCount = totalPagesFromPagination;
      } else if (typeof totalPagesDirect === 'number') {
        finalPageCount = totalPagesDirect;
      } else {
        const totalItems =
          res.data.pagination?.total || res.data.total || productsArray.length;
        finalPageCount = Math.ceil(totalItems / itemsPerPage);
      }

      setPageCount(finalPageCount || 0);
      setCurrentPage(pageIndex);
    } catch (err) {
      toast({
        title: 'Error Fetching Products',
        description: err.response?.data?.message || 'Error loading products.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchProducts(0); }, [fetchProducts]);

  const handlePageClick = ({ selected }) => fetchProducts(selected);

  /* ── delete product ── */
  const handleDelete = async (productId) => {
    try {
      const token =
        localStorage.getItem('authToken') ||
        sessionStorage.getItem('authToken');

      if (!token) {
        toast({ title: 'Not logged in', description: 'Please login again.', status: 'warning', duration: 3000, isClosable: true, position: 'bottom-right' });
        navigate('/login');
        return;
      }

      toast({ title: 'Deleting product…', status: 'info', duration: 1500, isClosable: true, position: 'bottom-right' });

      await axios.delete(`${baseUrl}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({ title: 'Product Deleted', description: 'Product removed successfully.', status: 'success', duration: 3000, isClosable: true, position: 'bottom-right' });
      fetchProducts(currentPage);
    } catch (err) {
      toast({ title: 'Delete Error', description: err.response?.data?.message || 'Server error.', status: 'error', duration: 4000, isClosable: true, position: 'bottom-right' });
    }
  };

  /* ─────── RENDER ─────── */
  return (
    <Box
      bg={pageBg}
      pt={{ base: '100px', sm: '120px', md: '120px' }}
      pb={{ base: 6, md: 10 }}
      px={{ base: 3, sm: 4, md: 6, lg: 8 }}
      minH="100vh"
    >
      {/* ── Top bar ── */}
      <Flex justify="flex-end" mb={4}>
        <Button
          colorScheme="green"
          onClick={() => navigate('/admin/products/add-new')}
          rounded="full"
          px={{ base: 4, md: 6 }}
          size={{ base: 'sm', md: 'md' }}
          fontWeight="600"
        >
          + Add Product
        </Button>
      </Flex>

      {/* ── Loading ── */}
      {loading ? (
        <Flex justify="center" align="center" mt={16}>
          <Spinner size="xl" color="purple.500" thickness="4px" />
        </Flex>

      /* ── Empty ── */
      ) : products.length === 0 ? (
        <Box bg={cardBg} p={8} rounded="2xl" textAlign="center" boxShadow="md" mt={4}>
          <Text fontSize="lg" color="gray.500">No products found.</Text>
        </Box>

      /* ── Table ── */
      ) : (
        <>
          <Box
            bg={cardBg}
            rounded="2xl"
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
            overflow="hidden"
            mt={2}
          >
            {/* Scrollable wrapper for tablet/desktop */}
            <Box className="srt-scroll-wrapper">
              <Table
                className="super-responsive-table"
                style={{ fontSize: '15px', width: '100%' }}
              >
                <Thead>
                  <Tr
                    style={{
                      background: headerBg,
                      color: 'white',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.6px',
                    }}
                  >
                    {[
                      'S No.',
                      'Image',
                      'Product',
                      'Code',
                      'Category',
                      'Brand',
                      'Price',
                      'Stock',
                      'Status',
                      'Created At',
                      'Action',
                    ].map((h) => (
                      <Th
                        key={h}
                        style={{
                          padding: '14px 16px',
                          color: 'white',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </Th>
                    ))}
                  </Tr>
                </Thead>

                <Tbody>
                  {products.map((product, index) => {
                    const priceInfo       = product?.price || {};
                    const mrp             = priceInfo.mrp ?? 0;
                    const sale            = priceInfo.sale ?? mrp ?? 0;
                    const discountPercent = priceInfo.discountPercent ?? null;
                    const imageUrl        = product.mainImage
                      ? `${apiRoot}${product.mainImage}`
                      : null;

                    return (
                      <Tr
                        key={product._id}
                        style={{ transition: 'background 0.15s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = rowHoverBg)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {/* S No. */}
                        <Td data-label="S No." style={{ padding: '12px 16px', fontWeight: '600' }}>
                          {currentPage * itemsPerPage + index + 1}
                        </Td>

                        {/* Image */}
                        <Td data-label="Image" style={{ padding: '12px 16px' }}>
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={product.name}
                              boxSize={{ base: '50px', md: '60px' }}
                              objectFit="cover"
                              objectPosition="top"
                              borderRadius="md"
                              border="1px solid"
                              borderColor="gray.200"
                            />
                          ) : (
                            <Text fontSize="xs" color="gray.400">No image</Text>
                          )}
                        </Td>

                        {/* Product Name */}
                        <Td data-label="Product" style={{ padding: '12px 16px' }}>
                          <Text fontWeight="600" noOfLines={2} maxW="180px">
                            {product.name}
                          </Text>
                        </Td>

                        {/* Product Code */}
                        <Td data-label="Code" style={{ padding: '12px 16px' }}>
                          <Text fontFamily="mono" fontSize="sm">
                            {product.productCode || product.code || '—'}
                          </Text>
                        </Td>

                        {/* Category */}
                        <Td data-label="Category" style={{ padding: '12px 16px' }}>
                          {product.category || '—'}
                        </Td>

                        {/* Brand */}
                        <Td data-label="Brand" style={{ padding: '12px 16px' }}>
                          {product.brand || '—'}
                        </Td>

                        {/* Price */}
                        <Td data-label="Price" style={{ padding: '12px 16px' }}>
                          <Text fontWeight="700" color="purple.600">₹{sale}</Text>
                          {discountPercent ? (
                            <Text fontSize="11px" color="gray.400">
                              MRP ₹{mrp} · {discountPercent}% off
                            </Text>
                          ) : mrp > 0 ? (
                            <Text fontSize="11px" color="gray.400">MRP ₹{mrp}</Text>
                          ) : null}
                        </Td>

                        {/* Stock */}
                        <Td data-label="Stock" style={{ padding: '12px 16px' }}>
                          {typeof product.totalStock !== 'undefined'
                            ? product.totalStock
                            : '—'}
                        </Td>

                        {/* Status */}
                        <Td data-label="Status" style={{ padding: '12px 16px' }}>
                          <Tag
                            size="sm"
                            colorScheme={
                              product.status === 'active'       ? 'green'
                              : product.status === 'draft'      ? 'yellow'
                              : product.status === 'out-of-stock' ? 'red'
                              : 'gray'
                            }
                            px={3} py={1}
                            rounded="full"
                            fontSize="12px"
                            fontWeight="700"
                          >
                            <TagLabel>
                              {product.status || 'N/A'}
                            </TagLabel>
                          </Tag>
                        </Td>

                        {/* Created At */}
                        <Td data-label="Created At" style={{ padding: '12px 16px', whiteSpace: 'nowrap', fontSize: '13px' }}>
                          {product.createdAt
                            ? new Date(product.createdAt).toLocaleString()
                            : '—'}
                        </Td>

                        {/* Actions */}
                        <Td
                          data-label="Action"
                          style={{ padding: '12px 16px' }}
                        >
                          <Flex gap={2} flexWrap="wrap">
                            <Button
                              size="sm"
                              colorScheme="blue"
                              px={4}
                              rounded="full"
                              fontWeight="600"
                              onClick={() => navigate(`/admin/products/${product._id}`)}
                              _hover={{ transform: 'scale(1.05)' }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="red"
                              px={4}
                              rounded="full"
                              fontWeight="600"
                              onClick={() => handleDelete(product._id)}
                              _hover={{ transform: 'scale(1.05)' }}
                            >
                              Delete
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          </Box>

          {/* ── Pagination ── */}
          {pageCount > 1 && (
            <Flex justify="center" mt={6}>
              <ReactPaginate
                previousLabel="‹"
                nextLabel="›"
                breakLabel="…"
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                forcePage={currentPage}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
                disabledClassName="disabled"
              />
            </Flex>
          )}
        </>
      )}
    </Box>
  );
};

export default Products;