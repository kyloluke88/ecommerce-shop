import { Box, Flex, Text, VStack, HStack, Image, IconButton, Button, Input, Stack, Grid, GridItem } from '@chakra-ui/react';
import { FiTrash2, FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';

export const Cart = () => {
  return (
    <>
    
    <VStack flex="1" gap={6} align="stretch" w="full">
      {/* 1. 购物车主体卡片 */}
      <Box bg="white" rounded="2xl" shadow="sm" border="1px solid" borderColor="gray.100" p={{ base: 4, md: 8 }}>
        
        {/* PC端标题：宽度与内容严格一致 */}
        <Text 
          fontSize="2xl" 
          fontWeight="bold" 
          mb={8} 
          display={{ base: "none", md: "block" }} // 手机隐藏，PC显示
        >
          Your Shopping Cart
        </Text>

        {/* PC端表头 */}
        <Grid 
          templateColumns="4fr 1.5fr 2fr 1.5fr 0.5fr" 
          gap={4} 
          pb={4} 
          borderBottom="1px solid" 
          borderColor="gray.100"
          display={{ base: "none", md: "grid" }} // 手机隐藏
          color="gray.500"
          fontWeight="bold"
          fontSize="sm"
        >
          <GridItem>Product</GridItem>
          <GridItem textAlign="center">Price</GridItem>
          <GridItem textAlign="center">Quantity</GridItem>
          <GridItem textAlign="center">Total</GridItem>
          <GridItem />
        </Grid>

        {/* 商品列表 */}
        <Stack gap={0}>
          {[1, 2].map((i) => (
            <Box 
              key={i} 
              py={{ base: 4, md: 6 }} 
              borderBottom="1px solid" 
              borderColor="gray.50"
              _last={{ borderBottom: "none" }}
            >
              {/* PC端布局 */}
              <Grid 
                templateColumns={{ base: "1fr", md: "4fr 1.5fr 2fr 1.5fr 0.5fr" }} 
                gap={4} 
                alignItems="center"
              >
                {/* Product：手机端和PC端通用结构但样式微调 */}
                <GridItem>
                  <Flex align="center" gap={4}>
                    <Box bg="gray.50" rounded="xl" p={2} border="1px" borderColor="gray.100" flexShrink={0}>
                      <Image src="/test.jpg" w={{ base: "70px", md: "80px" }} h={{ base: "70px", md: "80px" }} alt="p" />
                    </Box>
                    <Box>
                      <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>Montes Scelerisque</Text>
                      <Text fontSize="xs" color="gray.400">Size: Large | Color: Brown</Text>
                      
                      {/* 手机端特有：在产品下方直接显示单价 */}
                      <Text display={{ base: "block", md: "none" }} fontWeight="bold" mt={1} color="gray.700">
                        $248.66
                      </Text>
                    </Box>
                  </Flex>
                </GridItem>

                {/* Price：仅PC端显示 */}
                <GridItem display={{ base: "none", md: "block" }} textAlign="center" fontWeight="bold">
                  $248.66
                </GridItem>

                {/* Quantity & Total 组合：手机端并排，PC端分格 */}
                <GridItem colSpan={{ base: 1, md: 1 }}>
                  <Flex 
                    justify={{ base: "space-between", md: "center" }} 
                    align="center" 
                    mt={{ base: 3, md: 0 }}
                  >
                    {/* 数量加减器 */}
                    <HStack bg="gray.100" rounded="lg" px={1} py={1} gap={0}>
                      <IconButton aria-label="-" size="xs" variant="ghost" minW="28px"><FiMinus /></IconButton>
                      <Text fontWeight="bold" px={3} fontSize="sm">1</Text>
                      <IconButton aria-label="+" size="xs" variant="ghost" minW="28px"><FiPlus /></IconButton>
                    </HStack>

                    {/* 手机端的小计，紧跟在数量后面 */}
                    <Box display={{ base: "block", md: "none" }} textAlign="right">
                      <Text fontSize="2xs" color="gray.400" textTransform="uppercase">Total</Text>
                      <Text fontWeight="bold" color="blue.600">$248.66</Text>
                    </Box>
                  </Flex>
                </GridItem>

                {/* Total：仅PC端独立格子显示 */}
                <GridItem display={{ base: "none", md: "block" }} textAlign="center" fontWeight="bold" color="blue.600">
                  $248.66
                </GridItem>

                {/* Action：删除按钮 */}
                <GridItem textAlign="right">
                  <IconButton 
                    aria-label="del" 
                    variant="ghost" 
                    color="gray.300" 
                    _hover={{ color: "red.500", bg: "red.50" }}
                    size="sm"
                  >
                    <FiTrash2 />
                  </IconButton>
                </GridItem>
              </Grid>
            </Box>
          ))}
        </Stack>

        {/* Coupon 部分保持不变 */}
        <Flex mt={10} gap={4} direction={{ base: "column", sm: "row" }}>
          <Input placeholder="Coupon Code" bg="gray.50" border="none" _focus={{ border: "1px solid #cbd5e0" }} maxW={{ md: "300px" }} h="12" />
          <Button colorPalette="blue" px={10} h="12" fontWeight="bold">Apply Coupon</Button>
        </Flex>
      </Box>

      {/* Checkout 部分保持不变 (靠右对齐) */}
      <Flex justify="flex-start">
        <Box bg="white" rounded="2xl" shadow="sm" border="1px" borderColor="gray.100" p={8} w={{ base: "full", md: "600px" }}>
          <Text fontSize="lg" fontWeight="bold" mb={6}>Order Summary</Text>
          <VStack align="stretch" gap={4}>
            <Flex justify="space-between"><Text color="gray.500">Subtotal</Text><Text fontWeight="bold">$488</Text></Flex>
            <Flex justify="space-between"><Text color="gray.500">Discount</Text><Text fontWeight="bold" color="red.500">-$20</Text></Flex>
            <Flex justify="space-between"><Text color="gray.500">Shipping</Text><Text fontWeight="bold">$30</Text></Flex>
            <Box h="1px" bg="gray.100" my={2} />
            <Flex justify="space-between" fontSize="xl">
              <Text fontWeight="bold">Total</Text>
              <Text fontWeight="bold" color="blue.600">$498</Text>
            </Flex>
            <Button mt={6} size="xl" bg="#f472b6" color="white" _hover={{ bg: '#db2777' }} rounded="xl" h="14">
              Proceed To Checkout <FiArrowRight style={{ marginLeft: '8px' }} />
            </Button>
          </VStack>
        </Box>
      </Flex>
    </VStack>
    </>
  );
};