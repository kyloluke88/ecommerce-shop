import React, { useState, useRef } from 'react';
import { Box, Image, HStack } from '@chakra-ui/react';
import QuickPinchZoom from 'react-quick-pinch-zoom';

const ProductGallery: React.FC = () => {
  const images = [
    "fengdi.webp",
    "test.jpg",
    "fengdi.webp",
    "test.jpg",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const zoomLayerRef = useRef<HTMLImageElement>(null);

  // 桌面端：处理鼠标移动
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomLayerRef.current) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    // 计算鼠标在图片内的百分比位置
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    // 显示放大层并更新原点
    zoomLayerRef.current.style.opacity = '1';
    zoomLayerRef.current.style.transformOrigin = `${x}% ${y}%`;
    zoomLayerRef.current.style.transform = 'scale(2.5)';
  };

  const handleMouseLeave = () => {
    if (zoomLayerRef.current) {
      zoomLayerRef.current.style.opacity = '0';
      zoomLayerRef.current.style.transform = 'scale(1)';
    }
  };

  return (
    <Box className="max-w-md mx-auto p-4 select-none">
      {/* 1. 主展示区 */}
      <Box 
        className="relative overflow-hidden rounded-lg bg-white aspect-square cursor-zoom-in border border-gray-200"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* 【关键修复】层级 1：底层展示图（永远可见，支持移动端缩放） */}
        <Box className="w-full h-full">
          <QuickPinchZoom 
            onUpdate={({ x, y, scale }) => {
              const el = document.getElementById('mobile-img-target');
              if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
            }}
          >
            <img 
              id="mobile-img-target"
              src={images[activeIndex]} 
              className="w-full h-full object-contain"
              alt="Main Product"
            />
          </QuickPinchZoom>
        </Box>

        {/* 【关键修复】层级 2：桌面端放大遮罩层（默认透明度为 0，鼠标移入才显示） */}
        <img
          ref={zoomLayerRef}
          src={images[activeIndex]}
          alt="Zoom View"
          className="absolute inset-0 z-10 w-full h-full object-contain pointer-events-none opacity-0 transition-opacity duration-200 hidden md:block"
          style={{ willChange: 'transform, transform-origin' }}
        />
      </Box>

      {/* 2. 下方缩略图列表 */}
      <HStack spacing={3} className="mt-4 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <Box
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`
              flex-shrink-0 w-20 h-20 border-2 rounded-lg cursor-pointer transition-all
              ${activeIndex === index ? 'border-blue-500 shadow-md' : 'border-gray-100 opacity-60'}
            `}
          >
            <Image src={img} boxSize="full" objectFit="cover" rounded="md" />
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default ProductGallery;