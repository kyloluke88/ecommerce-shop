// components/Footer.jsx
'use client'

import { Box, Container, Grid, Text, Link, Stack } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box as="footer" bg="gray.900" color="white" py={10}>
      <Container maxW="7xl">
        {/* 主要区域 */}
        <Grid 
          templateColumns={{
            base: "1fr",
            md: "2fr 1fr 1fr"
          }}
          gap={8}
          mb={10}
        >
          {/* Logo 和联系信息 */}
          <Box>
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
              Logo
            </Text>
            <Stack spacing={3}>
              <Box>
                <Text fontWeight="semibold" mb={1}>Address</Text>
                <Text color="gray.300" fontSize="sm">
                  1234 Market St, Suite 500<br />
                  San Francisco, CA 94103
                </Text>
              </Box>
              <Box>
                <Text fontWeight="semibold" mb={1}>Contact</Text>
                <Text color="gray.300" fontSize="sm">
                  1-415-555-7890<br />
                  support@logo.com
                </Text>
              </Box>
            </Stack>
          </Box>

          {/* Product 列 */}
          <Box>
            <Text fontWeight="semibold" mb={4}>Product</Text>
            <Stack spacing={2}>
              {['Solutions', 'Features', 'Pricing', 'Enterprise'].map((item) => (
                <Link 
                  key={item} 
                  href="#" 
                  color="gray.300"
                  fontSize="sm"
                  _hover={{ color: 'white', textDecoration: 'underline' }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Resources 列 */}
          <Box>
            <Text fontWeight="semibold" mb={4}>Resources</Text>
            <Stack spacing={2}>
              {['Documentation', 'Blog', 'Guides', 'API Reference'].map((item) => (
                <Link 
                  key={item} 
                  href="#" 
                  color="gray.300"
                  fontSize="sm"
                  _hover={{ color: 'white', textDecoration: 'underline' }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Box>
        </Grid>

        {/* 底部版权和链接 */}
        <Box 
          pt={8} 
          borderTop="1px" 
          borderColor="gray.700"
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ base: 'flex-start', md: 'center' }}
          gap={4}
        >
          <Text color="gray.400" fontSize="sm">
            © 2026 Logo, Inc. All rights reserved.
          </Text>
          
          <Stack 
            direction={{ base: 'column', sm: 'row' }} 
            spacing={{ base: 2, sm: 6 }}
          >
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link 
                key={item} 
                href="#" 
                color="gray.300"
                fontSize="sm"
                _hover={{ color: 'white', textDecoration: 'underline' }}
              >
                {item}
              </Link>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}