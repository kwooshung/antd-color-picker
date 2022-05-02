import styles from './index.module.less';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Button, Modal, Popover, Segmented, Space, Typography } from 'antd';
import MdEditor from "rich-markdown-editor";
import KsColorPicker from '../../../src/components'
import { Colors } from '../../../src/Interfaces/Colors';
import Variables from '../../script/variables';

/**
 * 接口定义：Props属性
 */
export interface ExampleProps {
};

/**
 * 定义：Props属性默认值
 */
const defaultProps: ExampleProps = {
};

const Example: FC<ExampleProps> = ({
    ...props
}) => {
    /**
     * 状态：背景色
     */
    const [stateBackgroundColorGet, stateBackgroundColorSet] = useState<Colors | string>('#1890ff');

    /**
     * 状态：Antd 主题色
     */
    const [statePrimaryColorGet, statePrimaryColorSet] = useState<Colors | string>('#1890ff');

    /**
     * 状态：主题
     */
    const [stateThemeGet, stateThemeSet] = useState<string | number>('light');

    /**
     * 状态：文档MD说明
     */
    const [stateArticleGet, stateArticleSet] = useState<string>('');

    /**
     * 状态：弹窗
     */
    const [stateModalVisibleGet, stateModalVisibleSet] = useState<boolean>(false);



    /**
     * 函数
     */
    const methods = {
        /**
         * 请求 Markdown
         *
         * @param {string} url 地址
         * @return {*} 结果
         */
        async requestMD(url: string) {
            return await fetch(url);
        }
    };

    /**
     * 事件
     */
    const events = {
        /**
         * 事件：弹窗相关
         */
        onModal: {
            /**
             * 事件：显示
             */
            show() { stateModalVisibleSet(true); },
            /**
             * 事件：隐藏、关闭、取消
             */
            hide() { stateModalVisibleSet(false); }
        },
        /**
         * 事件：改变
         */
        onChange: {
            /**
             * 事件：背景颜色
             *
             * @param {Colors} color 颜色类型
             */
            backgroundColor(color: Colors) {
                stateBackgroundColorSet(color);
            },
            /**
             * 事件：主要颜色
             *
             * @param {string} color 颜色类型
             */
            theme(color: string) {
                stateThemeSet(color);
            },
            /**
             * 事件：主要颜色
             *
             * @param {Colors} color 颜色类型
             */
            primamryColor(color: Colors) {
                statePrimaryColorSet(color);
            }
        }
    };

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/kwooshung/antd-color-picker/master/README.md').then(async (data) => {
            stateArticleSet(await data.text());
        });
    }, []);

    /**
     * 组件：更新副作用
     */
    useEffect(() => {
        const html = document.querySelector('html');
        if (html) {
            html.dataset['theme'] = stateThemeGet.toString();
        }
    }, [stateThemeGet]);

    /**
     * 组件：更新副作用
     */
    useEffect(() => {
        if (statePrimaryColorGet) {
            typeof statePrimaryColorGet === 'string' || Variables({ primaryColor: statePrimaryColorGet.hexa.short });
        }
    }, [statePrimaryColorGet]);

    /**
     * 渲染
     */
    const renders = {
        /**
         * 更换主题色的拾色器
         *
         * @param {('hexa' | 'rgba' | 'hsla' | 'hsva')} [type='hexa'] 颜色显示模式
         * @return {*} {ReactNode} ReactNode节点
         */
        primaryColorPicker(type: 'hexa' | 'rgba' | 'hsla' | 'hsva' = 'hexa'): ReactNode {
            return <KsColorPicker.Chrome color={statePrimaryColorGet} colorType={type} colourless={true} onChange={events.onChange.primamryColor} />
        },
        /**
         * Ant Design 组件
         *
         * @return {*} {ReactNode} ReactNode节点
         */
        antds(): ReactNode {
            return <div className={styles['antd-components']}>
                <Typography.Title level={2}>Ant Design: Color Pickers </Typography.Title>
                <div className={styles['color-picker-types']}>
                    <Space align="start">
                        {this.primaryColorPicker('hexa')}
                        {this.primaryColorPicker('rgba')}
                        {this.primaryColorPicker('hsla')}
                        {this.primaryColorPicker('hsva')}
                    </Space>
                </div>
                <Typography.Title level={2}>Ant Design: Dynamic Theme</Typography.Title>
                <div>
                    <Space>
                        <Popover title={"动态修改：Primary-Color"} content={this.primaryColorPicker()} trigger="click">
                            <Button>气泡卡片/Popover</Button>
                        </Popover>
                        <Button type="primary" onClick={events.onModal.show}>打开弹窗</Button>
                    </Space>
                </div>
                <Typography.Title level={2}>Ant Design: Components</Typography.Title>
                <div>
                    <Space>
                        <Button type="primary">Primary Button</Button>
                        <Button>Default Button</Button>
                        <Button type="dashed">Dashed Button</Button>
                        <Button type="text">Text Button</Button>
                        <Button type="link">Link Button</Button>
                    </Space>
                </div>
                <Modal title="动态修改：Primary-Color" width={275} visible={stateModalVisibleGet} footer={null} onCancel={events.onModal.hide}>{this.primaryColorPicker()}</Modal>
            </div>;
        },
        /**
         * 编辑器
         *
         * @param {string} code MD代码
         * @return {*} {ReactNode} ReactNode节点
         */
        apiDoc(code: string): ReactNode {
            return <MdEditor className={styles.article} dark={stateThemeGet === 'dark'} value={code} readOnly={true} />;
        },
        /**
         * 头部
         *
         * @return {*} {ReactNode} ReactNode节点
         */
        header(): ReactNode {
            return <div className={styles.header}>
                <div style={{ background: typeof stateBackgroundColorGet === 'string' ? stateBackgroundColorGet : `rgb(${stateBackgroundColorGet.rgba.r} ${stateBackgroundColorGet.rgba.g} ${stateBackgroundColorGet.rgba.b} / ${stateBackgroundColorGet.rgba.a * 100}%)` }} />
                <div>
                    <div>
                        <Typography.Title level={1}>@KwooShung/Antd Color Picker</Typography.Title>
                        <Typography.Paragraph>一个 Ant Design 的 “颜色选择器”，目前仅实现了类似 Chrome 的选择器样式。</Typography.Paragraph>
                        <ul>
                            <li>支持 Ant Design 的动态主题</li>
                            <li>支持 HEX/HEXA/RGB/RGBA/HSL/HSLA/HSV/HSVA</li>
                            <li>支持十六进制颜色简写</li>
                            <li>往下看，了解更多</li>
                        </ul>
                        <iframe src="https://ghbtns.com/github-btn.html?user=kwooshung&repo=antd-color-picker&type=star&count=true&size=large" scrolling="0" width="160px" height="30px" frameBorder="0"></iframe>
                    </div>
                    <div>
                        <KsColorPicker.Chrome color={stateBackgroundColorGet} colourless={true} onChange={events.onChange.color}>
                            <div className={styles['theme-segmented']}>
                                <Segmented options={[{ value: 'light', label: '☀️ 浅色主题' }, { value: 'dark', label: '🌛 深色主题' }]} size="small" onChange={events.onChange.theme} />
                            </div>
                        </KsColorPicker.Chrome>
                    </div>
                </div>
            </div>;
        },
        /**
         * 主渲染
         *
         * @return {*}  {JSX.Element}
         */
        main(): JSX.Element {
            return <>
                {this.header()}
                {this.antds()}
                {this.apiDoc(stateArticleGet)}
            </>;
        }
    };

    return renders.main();
};

Example.defaultProps = defaultProps;

export default Example;