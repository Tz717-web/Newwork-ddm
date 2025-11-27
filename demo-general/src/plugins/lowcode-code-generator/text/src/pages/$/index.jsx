// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import { Slider, Button, MenuButton, Menu, Typography } from '@alifd/next';

import { Image } from '@alilc/lowcode-materials';

import { NextText } from '@alilc/lowcode-materials/lib/index.js';

import { createFetchHandler as __$$createFetchRequestHandler } from '@alilc/lowcode-datasource-fetch-handler';

import { create as __$$createDataSourceEngine } from '@alilc/lowcode-datasource-engine/runtime';

import '@alifd/next/lib/slider/style';

import '@alilc/lowcode-materials/lib/style';

import '@alifd/next/lib/button/style';

import '@alifd/next/lib/menu-button/style';

import '@alifd/next/lib/menu/style';

import '@alifd/next/lib/typography/style';

import utils, { RefsManager } from '../../utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../constants';

import './index.css';

class $$Page extends React.Component {
  _context = this;

  _dataSourceConfig = this._defineDataSourceConfig();
  _dataSourceEngine = __$$createDataSourceEngine(this._dataSourceConfig, this, {
    runtimeConfig: true,
    requestHandlersMap: { fetch: __$$createFetchRequestHandler() },
  });

  get dataSourceMap() {
    return this._dataSourceEngine.dataSourceMap || {};
  }

  reloadDataSource = async () => {
    await this._dataSourceEngine.reloadDataSource();
  };

  get constants() {
    return __$$constants || {};
  }

  constructor(props, context) {
    super(props);

    this.utils = utils;

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = { text: 'outer', isShowDialog: false };
  }

  $ = (refName) => {
    return this._refsManager.get(refName);
  };

  $$ = (refName) => {
    return this._refsManager.getAll(refName);
  };

  _defineDataSourceConfig() {
    const _this = this;
    return {
      list: [
        {
          type: 'fetch',
          isInit: function () {
            return true;
          }.bind(_this),
          options: function () {
            return {
              params: {},
              method: 'GET',
              isCors: true,
              timeout: 5000,
              headers: {},
              uri: 'mock/info.json',
            };
          }.bind(_this),
          id: 'info',
          shouldFetch: function () {
            console.log('should fetch.....');
            return true;
          },
        },
      ],
    };
  }

  componentWillUnmount() {
    console.log('will unmount');
  }

  testFunc() {
    console.log('test func');
  }

  onClick() {
    this.setState({
      isShowDialog: true,
    });
  }

  closeDialog() {
    this.setState({
      isShowDialog: false,
    });
  }

  getHelloWorldText() {
    return this.i18n('i18n-jwg27yo4');
  }

  getHelloWorldText2() {
    return this.i18n('i18n-jwg27yo3', {
      name: '絮黎',
    });
  }

  onTestConstantsButtonClicked() {
    console.log('constants.ConstantA:', this.constants.ConstantA);
    console.log('constants.ConstantB:', this.constants.ConstantB);
  }

  onTestUtilsButtonClicked() {
    this.utils.demoUtil('param1', 'param2');
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    console.log('did mount');
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <div
        ref={this._refsManager.linkRef('outerView')}
        style={{ height: '100%', textAlign: 'center' }}
      >
        <LccMicx5dio propName={<Slot />} content="" />
        <LccMi5ush2r propName={<Slot />} content="" />
        <LccMicx5dio propName={<Slot />} content="" />
        <LccMicx5dio propName={<Slot />} content="" />
        <Slider
          prefix="next-"
          animation="slide"
          arrows={true}
          arrowSize="medium"
          arrowPosition="inner"
          arrowDirection="hoz"
          autoplaySpeed={3000}
          dots={true}
          dotsDirection="hoz"
          draggable={true}
          infinite={true}
          slide="div"
          slideDirection="hoz"
          slidesToShow={1}
          slidesToScroll={1}
          speed={600}
          triggerType="click"
          centerPadding="50px"
          cssEase="ease"
          edgeFriction={0.35}
          swipe={true}
          touchMove={true}
          touchThreshold={5}
          useCSS={true}
          waitForAnimate={true}
          activeIndex={0}
          adaptiveHeight={false}
          autoplay={false}
          centerMode={false}
          defaultActiveIndex={0}
          lazyLoad={false}
          focusOnSelect={false}
          rtl=""
        >
          <Image src="https://img.alicdn.com/tps/TB1bewbNVXXXXc5XXXXXXXXXXXX-1000-300.png" />
          <Image src="https://img.alicdn.com/tps/TB1xuUcNVXXXXcRXXXXXXXXXXXX-1000-300.jpg" />
          <Image src="https://img.alicdn.com/tps/TB1ikP.NVXXXXaYXpXXXXXXXXXX-1000-300.jpg" />
          <Image src="https://img.alicdn.com/tps/TB1s1_JNVXXXXbhaXXXXXXXXXXX-1000-300.jpg" />
        </Slider>
        <FDPage
          contentProps={{ style: { background: 'rgba(255,255,255,0)' } }}
          ref={this._refsManager.linkRef('fdpage-bb43fbb0')}
        >
          <FDSection
            style={{ backgroundColor: 'rgba(255,255,255,1)', minHeight: '' }}
          >
            <FDBlock mode="transparent" span={12}>
              <FDCell
                align="left"
                verAlign="top"
                style={{ backgroundColor: 'rgba(255,255,255,1)' }}
                width=""
              >
                <FDP>
                  <NextText
                    type="h1"
                    mark={false}
                    code={false}
                    delete={false}
                    underline={false}
                    strong={false}
                    prefix=""
                    classname=""
                    style={{ fontSize: '25px' }}
                  >
                    Home
                  </NextText>
                </FDP>
              </FDCell>
            </FDBlock>
            <FDBlock
              mode="transparent"
              span={12}
              style={{ backgroundColor: 'rgba(255,255,255,1)', minHeight: '' }}
            >
              <FDRow style={{ backgroundColor: 'rgba(255,255,255,1)' }}>
                <FDCell
                  align="left"
                  verAlign="top"
                  style={{ backgroundColor: 'rgba(255,255,255,1)' }}
                  width=""
                >
                  <FDP>
                    <NextText
                      type="h5"
                      mark={false}
                      code={false}
                      delete={false}
                      underline={false}
                      strong={false}
                      prefix=""
                      classname=""
                      style={{ fontSize: '18px' }}
                    >
                      多语言展示
                    </NextText>
                  </FDP>
                  <FDP>
                    <NextText
                      type="inherit"
                      mark={false}
                      code={false}
                      delete={false}
                      underline={false}
                      strong={false}
                      prefix=""
                      classname=""
                    >
                      {__$$eval(() => this.getHelloWorldText())}
                    </NextText>
                    <NextText
                      type="inherit"
                      mark={false}
                      code={false}
                      delete={false}
                      underline={false}
                      strong={false}
                      prefix=""
                      classname=""
                    >
                      {__$$eval(() => this.getHelloWorldText2())}
                    </NextText>
                  </FDP>
                </FDCell>
                <FDCell
                  align="left"
                  verAlign="top"
                  style={{ backgroundColor: 'rgba(255,255,255,1)' }}
                >
                  <FDP>
                    <NextText
                      type="h5"
                      mark={false}
                      code={false}
                      delete={false}
                      underline={false}
                      strong={false}
                      prefix=""
                      classname=""
                      style={{ fontSize: '18px' }}
                    >
                      交互展示
                    </NextText>
                  </FDP>
                  <FDP>
                    <Button
                      prefix="next-"
                      type="primary"
                      size="medium"
                      htmlType="button"
                      component="button"
                      iconSize="xxs"
                      loading={false}
                      text={false}
                      warning={false}
                      disabled={false}
                      ref={this._refsManager.linkRef('button-4951c2d3')}
                      __events={{
                        eventDataList: [
                          {
                            type: 'componentEvent',
                            name: 'onClick',
                            relatedEventName: 'onTestConstantsButtonClicked',
                          },
                        ],
                        eventList: [
                          {
                            name: 'onClick',
                            description:
                              '点击按钮的回调\n@param {Object} e Event Object',
                            disabled: true,
                          },
                          { name: 'onMouseUp', disabled: false },
                        ],
                      }}
                      onClick={function () {
                        this.onTestConstantsButtonClicked.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                    >
                      constants
                    </Button>
                    <Button
                      prefix="next-"
                      type="primary"
                      size="medium"
                      htmlType="button"
                      component="button"
                      iconSize="xxs"
                      loading={false}
                      text={false}
                      warning={false}
                      disabled={false}
                      __events={{
                        eventDataList: [
                          {
                            type: 'componentEvent',
                            name: 'onClick',
                            relatedEventName: 'onTestUtilsButtonClicked',
                          },
                        ],
                        eventList: [
                          {
                            name: 'onClick',
                            description:
                              '点击按钮的回调\n@param {Object} e Event Object',
                            disabled: true,
                          },
                          { name: 'onMouseUp', disabled: false },
                        ],
                      }}
                      onClick={function () {
                        this.onTestUtilsButtonClicked.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                    >
                      utils
                    </Button>
                  </FDP>
                </FDCell>
              </FDRow>
            </FDBlock>
            <FDBlock
              mode="transparent"
              span={12}
              style={{ backgroundColor: 'rgba(255,255,255,1)', minHeight: '' }}
            >
              <FDCell
                align="left"
                verAlign="top"
                style={{ backgroundColor: 'rgba(255,255,255,1)' }}
              >
                <FDP>
                  <NextText
                    type="inherit"
                    mark={false}
                    code={false}
                    delete={false}
                    underline={false}
                    strong={false}
                    prefix=""
                    classname=""
                    style={{
                      height: '30px',
                      lineHeight: '30px',
                      fontSize: '20px',
                    }}
                  >
                    Powered By Lowcode Engine
                  </NextText>
                </FDP>
              </FDCell>
            </FDBlock>
          </FDSection>
        </FDPage>
        <MenuButton
          prefix="next-"
          type="normal"
          size="medium"
          label={
            <Slot>
              <Typography.Text style={{ color: 'inherit' }}>
                Edit Document
              </Typography.Text>
            </Slot>
          }
          defaultSelectedKeys={[]}
          autoWidth={true}
          popupTriggerType="click"
          plainData="Edit Document&#10;\tUndo&#10;\tRedo&#10;\tCut&#10;\tCopy&#10;\tPaste"
          ghost="light"
        >
          <Menu.Item key="0-0" checked={false} disabled={false}>
            <Typography.Text style={{ color: 'inherit' }}>Undo</Typography.Text>
          </Menu.Item>
          <Menu.Item key="0-1" checked={false} disabled={false}>
            <Typography.Text style={{ color: 'inherit' }}>Redo</Typography.Text>
          </Menu.Item>
          <Menu.Item key="0-2" checked={false} disabled={false}>
            <Typography.Text style={{ color: 'inherit' }}>Cut</Typography.Text>
          </Menu.Item>
          <Menu.Item key="0-3" checked={false} disabled={false}>
            <Typography.Text style={{ color: 'inherit' }}>Copy</Typography.Text>
          </Menu.Item>
          <Menu.Item key="0-4" checked={false} disabled={false}>
            <Typography.Text style={{ color: 'inherit' }}>
              Paste
            </Typography.Text>
          </Menu.Item>
        </MenuButton>
      </div>
    );
  }
}

export default $$Page;

function __$$eval(expr) {
  try {
    return expr();
  } catch (error) { }
}

function __$$evalArray(expr) {
  const res = __$$eval(expr);
  return Array.isArray(res) ? res : [];
}

function __$$createChildContext(oldContext, ext) {
  const childContext = {
    ...oldContext,
    ...ext,
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
