"use client"
import React, { useState } from 'react';
import {
  Box,
  Text,
  Heading,
  HStack,
  VStack,
  Badge,
  Button,
  IconButton,
  Flex,
  // 如果你的环境里 Tooltip 依然报错，建议暂时用 Box 替换
  Tooltip 
} from '@chakra-ui/react';
// 全面使用 react-icons
import { FiHeart, FiEye, FiPlus, FiMinus, FiStar } from 'react-icons/fi';

const ProductPrice: React.FC = () => {
  const [quantity, setQuantity] = useState(3);
  const [selectedWeight, setSelectedWeight] = useState('250g');

  const weights = ['250g', '500g', '1kg', '2kg'];

  return (
    <Box className="flex-1 space-y-6">
      {/* 1. 标题与评分 */}
      <VStack align="start" gap={2}>
        <Heading as="h1" size="lg" className="text-gray-800 font-bold leading-snug">
          Potato Chips 52g, American Cream & Onion Flavour, Crunchy Chips & Snacks.
        </Heading>
        <HStack gap={4}>
          <HStack gap={0.5} className="text-orange-400">
            {[...Array(4)].map((_, i) => <FiStar key={i} fill="currentColor" size={14} />)}
            <FiStar size={14} className="text-gray-300" />
          </HStack>
          <Text className="text-gray-400 text-sm border-l border-gray-200 pl-4">992 Ratings</Text>
        </HStack>
      </VStack>

      {/* 2. 价格区域 */}
      <Flex justify="space-between" align="center" wrap="wrap">
        <VStack align="start" gap={0}>
          <HStack align="baseline" gap={3}>
            <Text className="text-3xl font-bold text-gray-800">$664.00</Text>
            <Text className="text-emerald-500 font-bold">-78%</Text>
          </HStack>
          <Text className="text-gray-400 line-through text-sm italic">M.R.P.: $2,999.00</Text>
        </VStack>
        <VStack align="end" gap={1}>
          <Text className="text-gray-400 text-xs font-mono">SKU#: WH12</Text>
          <Badge colorPalette="green" variant="subtle" px={2} className="rounded">IN STOCK</Badge>
        </VStack>
      </Flex>

      <Text className="text-gray-500 text-sm leading-relaxed border-b border-t border-gray-50 py-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1990.
      </Text>

      {/* 3. 参数详情 */}
      <VStack align="start" gap={2} className="text-sm">
        {[
          { label: 'Closure', value: 'Hook & Loop' },
          { label: 'Sole', value: 'Polyvinyl Chloride' },
          { label: 'Width', value: 'Medium' },
          { label: 'Outer Material', value: 'A-Grade Standard Quality' },
        ].map((item, idx) => (
          <HStack key={idx} gap={2}>
            <Box className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <Text className="font-bold text-gray-700">{item.label} :</Text>
            <Text className="text-gray-500">{item.value}</Text>
          </HStack>
        ))}
      </VStack>

      {/* 4. 规格选择 */}
      <Box>
        <Text className="font-bold text-xs mb-3 text-gray-400 uppercase tracking-widest">Weight</Text>
        <HStack gap={3}>
          {weights.map((w) => (
            <Box
              key={w}
              onClick={() => setSelectedWeight(w)}
              className={`
                px-5 py-1.5 rounded-md cursor-pointer text-sm font-semibold transition-all border
                ${selectedWeight === w 
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-md scale-105' 
                  : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-200'}
              `}
            >
              {w}
            </Box>
          ))}
        </HStack>
      </Box>

      {/* 5. 底部操作栏 */}
      <Flex gap={4} wrap="wrap" align="center" className="pt-2">
        {/* 数量调节器 */}
        <HStack className="border border-gray-200 rounded-lg p-1 bg-gray-50/50">
          <IconButton
            aria-label="Decrease"
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <FiMinus />
          </IconButton>
          <Text className="px-4 font-bold text-gray-700 min-w-[32px] text-center">{quantity}</Text>
          <IconButton
            aria-label="Increase"
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
          >
            <FiPlus />
          </IconButton>
        </HStack>

        {/* 核心按钮 */}
        <Button
          size="lg"
          className="bg-[#516474] hover:bg-[#3d4d5a] text-white px-10 font-bold transition-all active:scale-95"
        >
          ADD TO CART
        </Button>

        {/* 辅助图标按钮 */}
        <HStack gap={2}>
          <IconButton
            aria-label="Wishlist"
            variant="outline"
            className="border-gray-200 text-gray-400 hover:text-red-500 hover:bg-red-50"
          >
            <FiHeart />
          </IconButton>
          <IconButton
            aria-label="Quick View"
            variant="outline"
            className="border-gray-200 text-gray-400 hover:bg-gray-50"
          >
            <FiEye />
          </IconButton>
        </HStack>
      </Flex>
    </Box>
  );
};

export default ProductPrice;