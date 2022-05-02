[![License MIT](https://img.shields.io/badge/license-MIT-ff4d4f?label=License)](https://github.com/kwooshung/antd-color-picker/blob/master/LICENSE) ![Npm Version](https://img.shields.io/static/v1?label=Npm&message=4.20.0&color=ea2039) [![Issues](https://img.shields.io/static/v1?label=Issues&message=On%20Github&color=24292f)](https://github.com/kwooshung/antd-color-picker/issues) ![Ant Design 最低版本](https://img.shields.io/static/v1?label=Ant%20Design&message=v4.20.0%2B&color=1890ff)
![kwooshung/antd-color-picker](https://img.shields.io/static/v1?label=kwooshung%2Fantd-color-picker&message=v1.0.0&color=52c41a) [![kwooshung/antd-color-picker](https://img.shields.io/static/v1?label=kwooshung%2Fantd-color-picker&message=on%20github&color=1890ff)](https://github.com/kwooshung/antd-color-picker) [![kwooshung/antd-color-picker](https://img.shields.io/static/v1?label=kwooshung%2Fantd-color-picker&message=on%20gitee&color=f38d30)](https://gitee.com/kwooshung/antd-color-picker) [![kwooshung/antd-color-picker](https://img.shields.io/static/v1?label=kwooshung%2Fantd-color-picker&message=on%20npm&color=ea2039)](https://www.npmjs.com/package/kwooshung/antd-color-picker)

---

# 为什么存在这个组件？

- 世面上虽然已有很多类似的插件，但是质量参差不齐，虽然也有很成熟的组件，如：[casesandberg](https://github.com/casesandberg)/**[react-color](https://github.com/casesandberg/react-color)**，但是对 [ant-design](https://github.com/ant-design)/**[ant-design](https://github.com/ant-design/ant-design)** 的支持不是特别好，特别是输入框，视觉上与 [ant-design](https://github.com/ant-design)/**[ant-design](https://github.com/ant-design/ant-design)** 不统一！
- 由于[官方暂时不打算开发：ColorPicker组件](https://github.com/ant-design/ant-design/issues/35315#issuecomment-1112807958)，所以只好自己动手弄一个简易版本（足以应付绝大多数场景了），后期再考虑更多功能。

# 演示

在线演示：[DEMO](https://kwooshung.github.io/antd-color-picker/)

# API

| 属性          | 说明                                                     | 数据类型                             | 必须 | 默认值                         | 版本   |
| ------------- | -------------------------------------------------------- | ------------------------------------ | ---- | ------------------------------ | ------ |
| className     | 类样式名                                                 | string                               | 否   |                                | v1.0.0 |
| colourless    | 无色模式，主要针对按钮，箭头图标，文字颜色均为浏览器默认 | boolean                              | 否   | false                          | v1.0.0 |
| width         | 宽度                                                     | number \| string（hexa色值，含`#`号）    | 否   | 225                            | v1.0.0 |
| color         | 默认颜色                                                 | [Colors](#colors) \| string          | 否   | #194d33                        | v1.0.0 |
| colorType     | 默认表达式                                               | `hexa` | `rgba` | `hsla` | `hsva`    |
| hexType       | 十六进制色值：类型，简写法（当可以简写时）和完整写法     | `short` | `full`                     | 否   | short                          |
| hexUppercase  | 十六进制色值：是否大写                                   | boolean                              | 否   | false                          | v1.0.0 |
| hexAlphaForce | 十六进制设置：是否强制Alpha通道透明表达方式              | boolean                              | 否   | false                          | v1.0.0 |
| pointer       | 滑动条（Hue，Alpha）上的指针按钮                         | `ReactNode` | `JSX.Element`          | 否   | v1.0.0 |
| copy          | 是否支持复制色值                                         | boolean                              | 否   | true                           | v1.0.0 |
| copytip       | 自定义复制色值的提示文案                                 | [ReactNode, ReactNode]               | 否   | ['复制当前色值', '已成功复制'] | v1.0.0 |
| onCopy        | 复制成功时的回调函数                                     | (*color*: [Colors](#colors)) => void | 否   | undefined                      | v1.0.0 |
| onChange      | 颜色改变时的回调函数                                     | (*color*: [Colors](#colors)) => void | 否   | undefined                      | v1.0.0 |

# Colors

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

# 感谢

本组件的诞生，离不开以下优秀的开源项目，为本组件的开发节省了大量的时间和精力成本！

- [casesandberg/react-color](http://casesandberg.github.io/react-color/)
- [@uiw/color-convert](https://uiwjs.github.io/react-color/#/convert)
- [@uiw/react-color-alpha](https://uiwjs.github.io/react-color/#/alpha)
- [@uiw/react-color-hue](https://uiwjs.github.io/react-color/#/hue)
- [@uiw/react-color-saturation](https://uiwjs.github.io/react-color/#/saturation)

