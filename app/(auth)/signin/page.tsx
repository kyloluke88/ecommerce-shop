"use client";
import React from 'react';
import { Box, Flex, Text, Heading, Input, Button, Link, Stack, Image, HStack } from '@chakra-ui/react';
import { toaster } from "@/components/ui/toaster"; 
import Navigation from "../../layouts/navigation";
import Footer from "../../layouts/footer";
import { useFormStatus } from "react-dom";
import { login } from "@/app/actions/auth"; // 引入你定义的 Action

// 抽离提交按钮以支持 loading 状态
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      bg="#516474"
      color="white"
      px={10}
      h="12"
      _hover={{ bg: '#3d4d5a' }}
      rounded="md"
      type="submit"
      isLoading={pending} // 使用 Chakra 的加载样式
      loadingText="Signing In..."
    >
      Login
    </Button>
  );
}

const LoginPage = () => {
 
// 修改：手动处理提交
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {


    event.preventDefault(); // 阻止浏览器默认的 POST 行为
    
    const formData = new FormData(event.currentTarget);
    
    // 手动调用 action 函数
    console.log("handle submit ??")

    const result = await login(formData);
    console.log("request result ??",result)
    if (result?.error) {
      toaster.create({
        title: "Login Failed",
        description: result.error,
        type: "error",
      });
    }
  };

  return (
    <>
      <Navigation />
      <Box minH="100vh" display="flex" flexDirection="column" alignItems="center" py={12} bg="white">
        <Stack align="center" mb={10}>
          <Heading as="h1" size="xl" color="gray.700">Login</Heading>
          <Text color="gray.500" fontSize="sm">
            Get access to your Orders, Wishlist and Recommendations.
          </Text>
        </Stack>

        <Flex
          as="form" // 关键：将 Flex 渲染为 form
          onSubmit={handleSubmit} // 使用 onSubmit 代替 action
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
                  name="email" // 必须添加 name
                  type="email" // 修改为 email 类型
                  placeholder="Enter your email add..." 
                  size="lg" 
                  variant="outline"
                  _focus={{ borderColor: "gray.400", boxShadow: "none" }}
                  rounded="md"
                  required
                />
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2} color="gray.700">Password*</Text>
                <Input 
                  name="password" // 必须添加 name
                  type="password"
                  placeholder="Enter your password" 
                  size="lg" 
                  variant="outline"
                  _focus={{ borderColor: "gray.400", boxShadow: "none" }}
                  rounded="md"
                  required
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
                {/* 使用自定义的提交按钮 */}
                <SubmitButton />
              </Flex>
            </Stack>
          </Box>

          {/* 右侧大图 */}
          <Box flex="1" display={{ base: 'none', md: 'block' }}>
            <Image
              src="/test.jpg"
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