[![License MIT](https://img.shields.io/badge/license-MIT-ff4d4f?label=License)](https://github.com/kwooshung/antd-color-picker/blob/master/LICENSE) ![Npm Version](https://img.shields.io/static/v1?label=Npm&message=4.20.0&color=ea2039) [![Issues](https://img.shields.io/static/v1?label=Issues&message=On%20Github&color=24292f)](https://github.com/kwooshung/antd-color-picker/issues) ![Ant Design 最低版本](https://img.shields.io/static/v1?label=Ant%20Design&message=v4.20.0%2B&color=1890ff)
![kwooshung/antd-color-picker](https://img.shields.io/static/v1?label=kwooshung%2Fantd-color-picker&message=v1.0.3&color=52c41a) [![kwooshung/antd-color-picker](https://img.shields.io/static/v1?label=kwooshung%2Fantd-color-picker&message=on%20github&color=1890ff)](https://github.com/kwooshung/antd-color-picker) [![kwooshung/antd-color-picker](https://img.shields.io/static/v1?label=kwooshung%2Fantd-color-picker&message=on%20gitee&color=f38d30)](https://gitee.com/kwooshung/antd-color-picker) [![kwooshung/antd-color-picker](https://img.shields.io/static/v1?label=kwooshung%2Fantd-color-picker&message=on%20npm&color=ea2039)](https://www.npmjs.com/package/@kwooshung/antd-color-picker)

---

# 为什么存在这个组件？

- 世面上虽然已有很多类似的插件，但是质量参差不齐，虽然也有很成熟的组件，如：[casesandberg](https://github.com/casesandberg)/**[react-color](https://github.com/casesandberg/react-color)**，但是对 [ant-design](https://github.com/ant-design)/**[ant-design](https://github.com/ant-design/ant-design)** 的支持不是特别好，特别是输入框，视觉上与 [ant-design](https://github.com/ant-design)/**[ant-design](https://github.com/ant-design/ant-design)** 不统一！
- 由于[官方暂时不打算开发：ColorPicker组件](https://github.com/ant-design/ant-design/issues/35315#issuecomment-1112807958)，所以只好自己动手弄一个简易版本（足以应付绝大多数场景了），后期再考虑更多功能。

# 安装

### yarn

```cmd
yarn add @kwooshung/antd-color-picker
```

### npm

```cmd
npm install @kwooshung/antd-color-picker
```

# 使用

### 引入

```typescript
import KsColorPicker from '@kwooshung/antd-color-picker';
```

### 简单使用

```typescript
<KsColorPicker.Chrome color='#f00' onChange={events.onChange.color} />
```

### [详细演示代码](https://github.com/kwooshung/antd-color-picker/blob/master/demo/components/Example/index.tsx)



# 演示

在线演示：[DEMO](https://kwooshung.github.io/antd-color-picker/)

# API

| 属性          | 说明                                                                                                                                                                             | 数据类型                             | 必须          | 默认值                         | 版本    |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------- | ------------------------------ | ------- |
| className     | 类样式名                                                                                                                                                                         | string                               | 否            |                                | v1.0.3  |
| colourless    | 无色模式，主要针对按钮，箭头图标，文字颜色均为浏览器默认，这样可以使用 [Antd 动态主题](https://ant.design/docs/react/customize-theme-variable-cn)，[颜色案例代码](#颜色案例代码) | boolean                              | 否            | false                          | v1.0.3  |
| width         | 宽度                                                                                                                                                                             | number、string（hexa色值，含`#`号）  | 否            | 225                            | v1.0.3  |
| color         | 默认颜色                                                                                                                                                                         | [Colors](#colors)、string            | 否            | #194d33                        | v1.0.3  |
| colorType     | 默认表达式                                                                                                                                                                       | `hexa`、`rgba`、`hsla`、`hsva`       | 否            | `hexa`                         | v1.0.3  |
| hexType       | 十六进制色值：类型，简写法（当可以简写时）和完整写法                                                                                                                             | `short`                              | `full`        | 否                             | `short` |
| hexUppercase  | 十六进制色值：是否大写                                                                                                                                                           | boolean                              | 否            | false                          | v1.0.3  |
| hexAlphaForce | 十六进制设置：是否强制Alpha通道透明表达方式                                                                                                                                      | boolean                              | 否            | false                          | v1.0.3  |
| pointer       | 滑动条（Hue，Alpha）上的指针按钮                                                                                                                                                 | `ReactNode`                          | `JSX.Element` | 否                             | v1.0.3  |
| copy          | 是否支持复制色值                                                                                                                                                                 | boolean                              | 否            | true                           | v1.0.3  |
| copytip       | 自定义复制色值的提示文案                                                                                                                                                         | [ReactNode, ReactNode]               | 否            | ['复制当前色值', '已成功复制'] | v1.0.3  |
| onCopy        | 复制成功时的回调函数                                                                                                                                                             | (*color*: [Colors](#colors)) => void | 否            | undefined                      | v1.0.3  |
| onChange      | 颜色改变时的回调函数                                                                                                                                                             | (*color*: [Colors](#colors)) => void | 否            | undefined                      | v1.0.3  |

# Colors

```typescript
import { Colors } from '@kwooshung/antd-color-picker/Interfaces/Colors';
```



```TypeScript
interface Colors {
    //十六进制
    hex: {
        short: string,
        full: string
    },
    //十六进制：含透明通道
    hexa: {
        short: string,
        full: string
    },
    rgb: {
        r: number,
        g: number,
        b: number
    },
    rgba: {
        r: number,
        g: number,
        b: number,
        a: number
    },
    hsl: {
        h: number,
        l: number,
        s: number
    },
    hsla: {
        h: number,
        l: number,
        s: number,
        a: number
    },
    hsv: {
        h: number,
        s: number,
        v: number
    },
    hsva: {
        h: number,
        s: number,
        v: number,
        a: number
    }
}
```

# 颜色案例代码

```less
[class*='ks-antd-color-picker-area'] {
        box-shadow:rgb(0 0 0 / 30%) 0 0 2px, rgb(0 0 0 / 30%) 0 4px 8px;

        > div {
            &[class*='ks-antd-color-picker-body'] {
                background:var(--panels-background);

                > [class*='ks-antd-color-picker-bars'] {
                    > [class*='ks-antd-color-picker-alpha'] {
                        box-shadow:inset rgb(0 0 0 / 25%) 0 0 1px;
                    }
                }
            }
        }
    }

    &[data-theme*='light'] {
        [class*='ks-antd-color-picker-area'] {
            > div {
                &[class*='ks-antd-color-picker-body'] {
                    > [class*='ks-antd-color-picker-controls'] {
                        > ul {
                            &[class*='ks-antd-color-picker-input-editable'] {
                                > li {
                                    > [class*='ks-antd-color-picker-input'] {
                                        [class*='input-group-addon'],
                                        [class*='input-number-group-addon'] {
                                            color:#aaa;
                                        }
                                    }
                                }
                            }

                            &[class*='ks-antd-color-picker-buttons'] {
                                background-color:#f0f0f0;

                                > li {
                                    color:#ccc;

                                    &:hover {
                                        color:#666;
                                        background-color:#ddd;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
```



# 感谢

本组件的诞生，离不开以下优秀的开源项目，为本组件的开发节省了大量的时间和精力成本！

- [casesandberg/react-color](http://casesandberg.github.io/react-color/)
- [@uiw/color-convert](https://uiwjs.github.io/react-color/#/convert)
- [@uiw/react-color-alpha](https://uiwjs.github.io/react-color/#/alpha)
- [@uiw/react-color-hue](https://uiwjs.github.io/react-color/#/hue)
- [@uiw/react-color-saturation](https://uiwjs.github.io/react-color/#/saturation)

