import React from 'react';
import { Box, Flex, Text, Heading, Input, Button, Link, Stack, Image, HStack } from '@chakra-ui/react';
import Navigation from "../../layouts/navigation";
import Footer from "../../layouts/footer";

const LoginPage = () => {
  return (
    <>
      <Navigation />

      <Box minH="100vh" display="flex" flexDirection="column" alignItems="center" py={12} bg="white">
        {/* 顶部标题 */}
        <Stack align="center" mb={10}>
          <Heading as="h1" size="xl" color="gray.700">Login</Heading>
          <Text color="gray.500" fontSize="sm">
            Get access to your Orders, Wishlist and Recommendations.
          </Text>
        </Stack>

        {/* 主卡片容器 */}
        <Flex
          w="full"
          maxW="1000px"
          bg="white"
          rounded="xl"
          shadow="sm"
          border="1px"
          borderColor="gray.100"
          overflow="hidden"
          direction={{ base: 'column', md: 'row' }}
        >
          {/* 左侧表单 */}
          <Box flex="1" p={{ base: 8, md: 12 }}>
            <Stack gap={6}>
              <Box>
                <Text fontWeight="bold" mb={2} color="gray.700">Email Address*</Text>
              
                  <Input 
                type="password"
                placeholder="Enter your email add..." 
                size="lg" 
                variant="outline"
                _focus={{ borderColor: "gray.400", boxShadow: "none" }}
                rounded="md"
              />
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2} color="gray.700">Password*</Text>
               
                <Input 
                type="password"
                placeholder="Enter your password" 
                size="lg" 
                variant="outline"
                _focus={{ borderColor: "gray.400", boxShadow: "none" }}
                rounded="md"
              />
                <Flex justify="end" mt={2}>
                  <Link fontSize="sm" color="gray.500" _hover={{ color: 'blue.500' }}>
                    Forgot Password?
                  </Link>
                </Flex>
              </Box>

              <Flex justify="space-between" align="center" pt={4}>
                <HStack gap={1}>
                  <Text color="gray.600">Create Account?</Text>
                  <Link color="blue.500" fontWeight="bold">Sign Up</Link>
                </HStack>
                <Button
                  bg="#516474"
                  color="white"
                  px={10}
                  h="12"
                  _hover={{ bg: '#3d4d5a' }}
                  rounded="md"
                >
                  Login
                </Button>
              </Flex>
            </Stack>
          </Box>

          {/* 右侧大图 */}
          <Box flex="1" display={{ base: 'none', md: 'block' }}>
            <Image
              src="/login-banner.jpg" // 请替换为你自己的图片路径
              alt="Login Visual"
              objectFit="cover"
              w="full"
              h="full"
            />
          </Box>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default LoginPage;