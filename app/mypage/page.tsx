"use client"
import { TopTab } from '../components/mypage/toptab';
import { Cart } from '../components/mypage/cart';
import { Recommended } from '../components/mypage/recommended';
import Navigation from "../layouts/navigation";
import Footer from "../layouts/footer";

import { Box, Flex, Container } from '@chakra-ui/react';
import { useState } from 'react';



export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Cart');

  return (
    <>    
    <Navigation/>
    <Box minH="100vh" bg="gray.50/50">
      <Container maxW="7xl" py={{ base: 4, md: 8 }}>
      {/* 1. 顶部标签页 */}
      <TopTab activeTab={activeTab} setActiveTab={setActiveTab} />
      
    
        <Flex direction={{ base: "column", lg: "row" }} gap={8}>
          
          {/* 2. 中间主内容 (Cart / Others) */}
          <Box flex="1">
            {activeTab === 'Cart' ? (
              <Cart />
            ) : (
              <Box bg="white" p={20} rounded="xl" textAlign="center" color="gray.400">
                Content for {activeTab}
              </Box>
            )}
          </Box>

          {/* 3. 右侧推荐栏 */}
          <Recommended />
          
        </Flex>
      </Container>
    </Box>
    <Footer/>
    </>

  );
}