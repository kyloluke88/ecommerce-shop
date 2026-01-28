import React from 'react';
import { Box, Flex, Text, Heading, Input, Button, Stack, SimpleGrid, Link, HStack } from '@chakra-ui/react';
import Navigation from "../../layouts/navigation";
import Footer from "../../layouts/footer";

const RegisterPage = () => {
  return (
    <>
      <Navigation />

      <Box minH="100vh" py={12} bg="white">
        {/* 顶部标题 */}
        <Stack align="center" mb={10}>
          <Heading as="h1" size="xl" color="gray.700">Register</Heading>
          <Text color="gray.500" fontSize="sm">
            Best place to buy and sell digital products.
          </Text>
        </Stack>

        {/* 注册表单卡片 */}
        <Box
          maxW="1100px"
          mx="auto"
          bg="white"
          p={{ base: 6, md: 10 }}
          rounded="xl"
          shadow="sm"
          border="1px"
          borderColor="gray.100"
        >
          <Stack gap={8}>
            {/* 第一行：名和姓 */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
              <Box>
                <Text fontWeight="bold" mb={2} color="gray.700">First Name*</Text>
                <Input placeholder="Enter your first name" size="lg" rounded="md" />
              </Box>
              <Box>
                <Text fontWeight="bold" mb={2} color="gray.700">Last Name*</Text>
                <Input placeholder="Enter your last name" size="lg" rounded="md" />
              </Box>
            </SimpleGrid>

            {/* 第二行：邮箱和电话 */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
              <Box>
                <Text fontWeight="bold" mb={2} color="gray.700">Email*</Text>
                <Input placeholder="Enter your email add..." size="lg" rounded="md" />
              </Box>
              <Box>
                <Text fontWeight="bold" mb={2} color="gray.700">Phone Number*</Text>
                <Input placeholder="Enter your phone number" size="lg" rounded="md" />
              </Box>
            </SimpleGrid>

            {/* 第三行：地址（全宽） */}
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Address</Text>
              <Input placeholder="Address Line 1" size="lg" rounded="md" />
            </Box>

            {/* 第四行：城市和邮编 */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
              <Box>
                <Text fontWeight="bold" mb={2} color="gray.700">City *</Text>
                <Input placeholder="City" size="lg" rounded="md" />
              </Box>
              <Box>
                <Text fontWeight="bold" mb={2} color="gray.700">Post Code</Text>
                <Input placeholder="Post Code" size="lg" rounded="md" />
              </Box>
            </SimpleGrid>

            {/* 第五行：国家和地区 */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
              <Box>
                <Text fontWeight="bold" mb={2} color="gray.700">Country *</Text>
                <Input placeholder="Country" size="lg" rounded="md" />
              </Box>
              <Box>
                <Text fontWeight="bold" mb={2} color="gray.700">Region State</Text>
                <Input placeholder="Region/State" size="lg" rounded="md" />
              </Box>
            </SimpleGrid>

            {/* 底部操作区 */}
            <Flex justify="space-between" align="center" pt={4}>
              <HStack gap={1}>
                <Text color="gray.600">Already have an account?</Text>
                <Link color="blue.500" fontWeight="bold">Login</Link>
              </HStack>
              <Button
                bg="#516474"
                color="white"
                px={12}
                h="12"
                _hover={{ bg: '#3d4d5a' }}
                rounded="md"
              >
                Register
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Box>ß
      <Footer />
    </>
  );
};

export default RegisterPage;