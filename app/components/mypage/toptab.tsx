import { Box, Tabs, Text, HStack, Container } from '@chakra-ui/react';
import { FiUser, FiMapPin, FiShoppingCart, FiPackage, FiUsers, FiFileText } from 'react-icons/fi';

const menuItems = [
  { id: 'Account', icon: <FiUser />, label: 'Account' },
  { id: 'Cart', icon: <FiShoppingCart />, label: 'Cart' },
  { id: 'Orders', icon: <FiPackage />, label: 'Orders' },
  { id: 'Favorite', icon: <FiUsers />, label: 'Favorite' },
];

export const TopTab = ({ activeTab, setActiveTab }) => (
  <Box bg="white" position="sticky" top="0" zIndex="10">
    {/* 增加 Container 以对齐页面主体，并处理手机端的两侧间距 */}
    {/* <Container maxW="1400px" px={{ base: 0, md: 8 }}>  */}
      <Tabs.Root 
        value={activeTab} 
        onValueChange={(e) => setActiveTab(e.value)}
        variant="plain" // 使用 plain 变体以便我们完全自定义下划线
      >
        <Tabs.List 
          overflowX="auto" 
          whiteSpace="nowrap" 
          css={{ 
            '&::-webkit-scrollbar': { display: 'none' },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
          }}
          gap={{ base: 4, md: 10 }} // 手机端缩小间距防止滑不到头
          px={{ base: 4, md: 0 }}   // 关键：手机端给 4px margin，确保第一个和最后一个不贴边
          position="relative"
        >
          {menuItems.map((item) => (
            <Tabs.Trigger 
              key={item.id} 
              value={item.id}
              px={0} // 移除默认填充，让下划线精准对齐文字
              py={4}
              cursor="pointer"
              color="gray.500"
              _selected={{ color: "blue.600", fontWeight: "bold" }}
              transition="all 0.2s"
            >
              <HStack gap={2}>
                <Box fontSize="18px">{item.icon}</Box>
                <Text fontSize="sm">{item.label}</Text>
              </HStack>
            </Tabs.Trigger>
          ))}
          
          {/* 原生下划线：自动跟随选中项，解决不对齐问题 */}
          {/* <Tabs.Indicator 
            height="2px" 
            bg="blue.600" 
            bottom="0" 
            borderRadius="full" 
          /> */}
        </Tabs.List>
      </Tabs.Root>
    {/* </Container> */}
  </Box>
);