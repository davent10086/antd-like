import React from 'react';
import Flex from '../index';

// 响应式示例：两种方式
// 1) 不设断点：依靠 flex: '1 1 <minWidth>' + wrap，自适应换行
// 2) 设断点：用媒体查询控制 item 宽度（典型 1/1、1/2、1/3 栅格）

const ResponsiveFlexDemo: React.FC = () => {
    const items = Array.from({ length: 8 }, (_, i) => i + 1);

    return (
        <div style={{ padding: 16 }}>
            <h3>方式一：自适应列（不设断点）</h3>
            <p style={{ color: '#666', marginTop: 4 }}>
                通过给 Flex.Item 设置 flex: '1 1 220px' + wrap，当容器变窄时自动换行；变宽时自动多列。
            </p>
            <Flex wrap gap={12}>
                {items.map((n) => (
                    <Flex.Item key={`auto-${n}`} style={{ flex: '1 1 220px' }}>
                        <div
                            style={{
                                background: '#fff',
                                border: '1px solid #f0f0f0',
                                borderRadius: 6,
                                padding: 12,
                                height: 80,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            卡片 {n}
                        </div>
                    </Flex.Item>
                ))}
            </Flex>

            <h3 style={{ marginTop: 24 }}>方式二：断点控制（媒体查询）</h3>
            <p style={{ color: '#666', marginTop: 4 }}>
                使用媒体查询在不同屏幕宽度下调整 item 宽度（小屏 1 列，中屏 2 列，大屏 3 列）。
            </p>

            {/* Demo 内联样式：真实项目可抽到独立 scss */}
            <style>{`
        .r-card { width: 100%; }
        @media (min-width: 768px) {
          .r-card { width: calc(50% - 12px); } /* 2 列，减去 gap */
        }
        @media (min-width: 1200px) {
          .r-card { width: calc(33.333% - 12px); } /* 3 列 */
        }
      `}</style>

            <Flex wrap gap={12}>
                {items.map((n) => (
                    <div key={`bp-${n}`} className="r-card">
                        <div
                            style={{
                                background: '#fff',
                                border: '1px solid #f0f0f0',
                                borderRadius: 6,
                                padding: 12,
                                height: 80,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            卡片 {n}
                        </div>
                    </div>
                ))}
            </Flex>
        </div>
    );
};

export default ResponsiveFlexDemo;
