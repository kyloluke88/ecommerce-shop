// components/Navbar.jsx
'use client'

import { Box, HStack, Link, Text, IconButton } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { IoCartOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode"

import { useState } from "react"
import CartDrawer from '../components/cartDrawer';

export default function Navbar() {
    const pathname = usePathname()

    const [cartOpen, setCartOpen] = useState(false);

    const navBg = useColorModeValue('white', 'gray.900')
    const borderColor = useColorModeValue('gray.200', 'gray.700')
    const navItems = [
        { label: 'ホーム', href: '/' },
        { label: 'マーイページ', href: '/mypage' },
        { label: '商品', href: '/products' },
        { label: 'ログイン', href: '/signin' },
        { label: '登録', href: '/signup' },
        { label: 'カート', href: '/mycart' }
    ]

    return (
        <Box 
        as="nav" 
            p={4}
            bg={navBg}
            borderBottom="1px"
            borderColor={borderColor}
            // position="fixed"
            top={0}
            left={0}
            w="100%"
            zIndex={100}
            boxShadow="sm"
        >
            <HStack spacing={8} justify="space-between" maxW="7xl" mx="auto">
                {/* Logo */}
                <Text fontSize="xl" fontWeight="bold" color="blue.600">
                    MyShop
                </Text>

                {/* 导航链接 */}
                <HStack spacing={8}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                position="relative"
                                _hover={{ textDecoration: 'none' }}
                                as={NextLink}
                            >
                                <Box
                                    display="inline-flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    minW="100px"
                                    px={4}
                                    py={2}
                                    // hover 效果
                                    _hover={{
                                        color: 'blue.500',
                                        '& .nav-indicator': {
                                            bg: 'blue.500'
                                        }
                                    }}
                                >
                                    <Text
                                        fontWeight={isActive ? 'bold' : 'normal'}
                                        color={isActive ? 'blue.600' : 'gray.600'}
                                        // hover 时改变颜色
                                        _hover={{ color: 'blue.500' }}
                                    >
                                        {item.label}
                                    </Text>
                                </Box>

                                {/* 激活状态指示器 - hover 时也显示 */}
                                <Box
                                    className="nav-indicator"
                                    position="absolute"
                                    bottom="-4px"
                                    left="50%"
                                    transform="translateX(-50%)"
                                    width={isActive ? '60%' : '0%'}
                                    height="2px"
                                    bg={isActive ? 'blue.500' : 'transparent'}
                                    borderRadius="full"
                                    transition="all 0.2s"
                                    // hover 时显示指示器
                                    _groupHover={{
                                        width: '60%',
                                        bg: 'blue.400'
                                    }}
                                />
                            </Link>
                        )
                    })}
                </HStack>

                {/* 右侧按钮组 */}
                <HStack spacing={2}>

                    <IconButton
                        as={NextLink}
                        href="/profile"
                        icon={<IoCartOutline />}
                        aria-label="bell"
                        variant="ghost"
                        colorScheme="blue"
                        size="md"
                        isRound
                    >
                        <FaRegBell />
                    </IconButton>
                    <IconButton
                        aria-label="Call support"
                        key="cart"
                        variant="ghost"
                        colorScheme="blue"
                        size="md"
                        onClick={() => setCartOpen(true)}
                    >
                        <IoCartOutline />
                    </IconButton>

                    <ColorModeButton />

                    <IconButton
                        aria-label="Call support"
                        key="signin"
                        variant="outline"
                        colorScheme="blue"
                        size="md"
                        w={70}
                    >
                        sign in
                    </IconButton>
                </HStack>
            </HStack>

            <CartDrawer open={cartOpen} setOpen={setCartOpen} />
        </Box>
    )
}