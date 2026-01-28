
import { Box, Grid, Text, Button, Badge, Flex, Image } from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'
import Link from 'next/link'


const products = [
    {
        id: 1,
        title: "Chianti",
        subtitle: "CHIANTI DOCG",
        description: "DOCG DOCUMENTO DI ORIGINE CONTROLLATA E GIUDIZIATA 2019",
        price: "$100.00",
        tags: ["Best Seller", "New Arrival"],
        image: "/fengdi.webp" // 替换为你的图片路径
    },
    {
        id: 2,
        title: "Ballantine's Finest",
        subtitle: "FINEST SCOTCH WHISKY",
        description: "BLENDED & BOTTLED BY SIR JOHN BALNITZER AND SON LTD DISTILLERS DUMBRON SCOTLAND",
        price: "$89.00",
        tags: ["Best in UK"],
        image: "/fengdi.webp"
    },
    {
        id: 3,
        title: "Chianti Classico Riserva",
        subtitle: "Premium Tuscan red wine",
        description: "Premium Tuscan red wine with classic character",
        price: "$186",
        image: "/fengdi.webp"
    },
    {
        id: 4,
        title: "Ron Bacardi Superior",
        subtitle: "Premium white rum",
        description: "Premium white rum with exceptional smoothness",
        price: "$256",
        image: "/fengdi.webp"
    },
    {
        id: 5,
        title: "Haig Scotch Whisky",
        subtitle: "Classic Scottish whisky",
        description: "Classic Scottish whisky with smooth character",
        price: "$142",
        image: "/fengdi.webp"
    },
    {
        id: 6,
        title: "Ballantine's Finest",
        subtitle: "Classic blended Scotch",
        description: "Classic blended Scotch whisky with elegant character",
        price: "$189",
        image: "/fengdi.webp"
    }
]

export default function ProductGrid() {

    return (
        <>
            <Box p={{ base: 4, md: 8 }} maxW="7xl" mx="auto">

                {/* 商品网格 */}
                <Grid
                    templateColumns={{
                        base: "1fr",      // 手机：1列
                        sm: "repeat(2, 1fr)", // 小平板：2列
                        md: "repeat(3, 1fr)", // 平板：3列
                        lg: "repeat(4, 1fr)"  // 桌面：4列
                    }}
                    gap={{ base: 4, md: 6 }}
                >
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/product_detail`} // 假设你的详情页路径是这个
                            style={{ textDecoration: 'none' }} // 移除下划线
                        >
                            <Box
                                key={product.id}
                                bg="white"
                                borderRadius="lg"
                                overflow="hidden"
                                boxShadow="sm"
                                transition="all 0.2s"
                                _hover={{
                                    boxShadow: "lg",
                                    transform: "translateY(-2px)"
                                }}
                                border="1px"
                                borderColor="gray.100"
                            >
                                {/* 图片区域 */}
                                <Box
                                    position="relative"
                                    h={{ base: "200px", md: "240px" }}
                                    overflow="hidden"
                                >
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        objectFit="cover"
                                        w="100%"
                                        h="100%"
                                        transition="transform 0.3s"
                                        _hover={{ transform: "scale(1.05)" }}
                                    />

                                    {/* 标签 */}
                                    {product.tags && (
                                        <Flex position="absolute" top="3" left="3" gap="2">
                                            {product.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    colorScheme="blue"
                                                    fontSize="xs"
                                                    borderRadius="full"
                                                    px="3"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </Flex>
                                    )}
                                </Box>

                                {/* 商品信息 */}
                                <Box p={{ base: 4, md: 5 }}>
                                    {/* 标题 */}
                                    <Text
                                        fontSize={{ base: "lg", md: "xl" }}
                                        fontWeight="bold"
                                        mb="1"
                                        noOfLines={1}
                                    >
                                        {product.title}
                                    </Text>

                                    {/* 副标题 */}
                                    <Text
                                        fontSize="sm"
                                        color="gray.600"
                                        mb="2"
                                        noOfLines={1}
                                    >
                                        {product.subtitle}
                                    </Text>

                                    {/* 描述 */}
                                    <Text
                                        fontSize="sm"
                                        color="gray.500"
                                        mb="4"
                                        noOfLines={2}
                                        h="40px"
                                    >
                                        {product.description}
                                    </Text>

                                    {/* 价格和按钮 */}
                                    <Flex justify="space-between" align="center" mt="auto">
                                        <Text fontSize="xl" fontWeight="bold" color="blue.600">
                                            {product.price}
                                        </Text>
                                        <Button
                                            size={{ base: "sm", md: "md" }}
                                            colorScheme="blue"
                                            leftIcon={<FiShoppingCart />}
                                        >
                                            购买
                                        </Button>
                                    </Flex>
                                </Box>
                            </Box>
                        </Link>
                    ))}
                </Grid>
            </Box>
        </>
    )


}