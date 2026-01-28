import { Box, Flex, Image, Text, HStack, VStack, SimpleGrid } from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';

// 模拟数据
const bundleItems = [
  { id: 1, name: "Honey Spiced Nuts", price: 32.00, oldPrice: 45.00, rating: 3, img: "/test.jpg" },
  { id: 2, name: "Dates Value Pouch", price: 56.00, oldPrice: 60.00, rating: 5, img: "/fengdi.webp" },
  { id: 3, name: "Graps Mix Snack", price: 28.00, oldPrice: 35.00, rating: 3, img: "/fengdi.webp" },
];

const BundleProducts = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} className="my-6">
      {bundleItems.map((item) => (
        <Box 
          key={item.id}
          className="bg-gray-50/50 border border-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <Flex align="center" gap={4}>
            {/* 左侧：商品小图 */}
            <Box className="w-20 h-20 bg-white rounded-md border border-gray-100 flex-shrink-0 overflow-hidden">
              <Image 
                src={item.img} 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform" 
                alt={item.name} 
              />
            </Box>

            {/* 右侧：商品信息 */}
            <VStack align="start" gap={0} flex="1">
              <Text className="font-bold text-gray-700 text-sm no-of-lines-1">
                {item.name}
              </Text>
              
              {/* 评分 */}
              <HStack gap={0.5} className="my-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    size={12} 
                    fill={i < item.rating ? "#F6AD55" : "none"} 
                    color={i < item.rating ? "#F6AD55" : "#CBD5E0"} 
                  />
                ))}
              </HStack>

              {/* 价格 */}
              <HStack align="baseline" gap={2}>
                <Text className="font-bold text-gray-900">${item.price.toFixed(2)}</Text>
                {item.oldPrice && (
                  <Text className="text-gray-400 line-through text-xs">${item.oldPrice.toFixed(2)}</Text>
                )}
              </HStack>
            </VStack>
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default BundleProducts;