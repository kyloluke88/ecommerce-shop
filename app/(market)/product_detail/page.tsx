"use client"
import { Box, Flex, VStack, Text, Tabs } from '@chakra-ui/react';

import ProductGallery from "../../components/products/detailGallery";
import ProductPrice from "../../components/products/detailPrice";
import BundleProducts from "../../components/products/BundleProducts";
import Navigation from "../../layouts/navigation";
import Breadcrumbs from "../../components/breadcrumbs";
import Footer from "../../layouts/footer";

export default function ProductPage() {
    return (
        <>
            <Navigation />
            <Breadcrumbs />
            <Box maxW="1400px" mx="auto" p={{ base: 4, md: 8 }}>
                <Flex direction={{ base: "column", lg: "row" }} gap={10}>

                    {/* 右边内容区 */}
                    <VStack flex="1" gap={12} align="stretch">
                        {/* 右上：之前那两个组件 */}
                        <Flex direction={{ base: "column", md: "row" }} gap={10}>
                            <Box flex="1"><ProductGallery /></Box>
                            <Box flex="1.2"><ProductPrice /></Box>
                        </Flex>

                        <BundleProducts />

                        {/* 右下：Tab 组件 */}
                        <Box className="border border-gray-100 rounded-xl overflow-hidden">
                            <Tabs.Root defaultValue="tab1">
                                <Tabs.List className="bg-gray-50 p-2">
                                    <Tabs.Trigger value="tab1" className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md font-bold">Detail</Tabs.Trigger>
                                    <Tabs.Trigger value="tab2" className="px-6 py-3 font-bold">Specifications</Tabs.Trigger>
                                    <Tabs.Trigger value="tab3" className="px-6 py-3 font-bold">Reviews</Tabs.Trigger>
                                </Tabs.List>
                                <Box p={6}>
                                    <Tabs.Content value="tab1">商品描述内容...</Tabs.Content>
                                    <Tabs.Content value="tab2">规格参数内容...</Tabs.Content>
                                    <Tabs.Content value="tab3">用户评论内容...</Tabs.Content>
                                </Box>
                            </Tabs.Root>
                        </Box>
                    </VStack>
                    {/* 左边：推荐列表占位 */}
                    <Box w={{ base: "full", lg: "300px" }} bg="gray.50" rounded="xl" p={4} minH="400px">
                        <Text fontWeight="bold" mb={4}>Recommended</Text>
                        <Box className="h-40 bg-white mb-4 rounded border-dashed border-2 border-gray-200" />
                        <Box className="h-40 bg-white rounded border-dashed border-2 border-gray-200" />
                    </Box>

                </Flex>
            </Box>

             <Footer />
        </>
    );
}