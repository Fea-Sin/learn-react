import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/
import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
import proxy from './proxy';
import webpackPlugin from './plugin.config';

const { pwa } = defaultSettings;

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';

const plugins: IPlugin[] = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false,
      // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },{
              path: '/test',
              name: 'test',
              icon: 'crown',
              routes: [
                {
                  path: '/test/one',
                  name: 'test-one',
                  component: './test/TestOne',
                }, {
                  path: '/test/two',
                  name: 'test-two',
                  component: './test/TestTwo',
                }, {
                  path: '/test/three',
                  name: 'test-three',
                  component: './test/TestThree',
                }, {
                  path: '/test/four',
                  name: 'test-four',
                  component: './test/TestFour',
                }, {
                  path: '/test/five',
                  name: 'test-five',
                  component: './test/TestFive',
                }, {
                  path: '/test/six',
                  name: 'test-six',
                  component: './test/TestSix',
                }, {
                  path: '/test/seven',
                  name: 'test-seven',
                  component: './test/TestSeven',
                }, {
                  path: '/test/eight',
                  name: 'test-eight',
                  component: './test/TestEight',
                }, {
                  path: '/test/nine',
                  name: 'test-nine',
                  component: './test/TestNine',
                }, {
                  path: '/test/ten',
                  name: 'test-ten',
                  component: './test/TestTen',
                }, {
                  path: '/test/eleven',
                  name: 'test-eleven',
                  component: './test/TestEleven',
                }, {
                  path: '/test/twelve',
                  name: 'test-twelve',
                  component: './test/TestTwelve',
                }, {
                  path: '/test/thirteen',
                  name: 'test-thirteen',
                  component: './test/TestThirteen',
                }, {
                  path: '/test/fourteen',
                  name: 'test-fourteen',
                  component: './test/TestFourteen',
                }, {
                  path: '/test/fifteen',
                  name: 'test-fifteen',
                  component: './test/TestFifteen',
                }, {
                  path: '/test/sixteen',
                  name: 'test-sixteen',
                  component: './test/TestSixteen',
                }, {
                  path: '/test/seventeen',
                  name: 'test-seventeen',
                  component: './test/TestSeventeen',
                }, {
                  path: '/test/eighteen',
                  name: 'test-eighteen',
                  component: './test/TestEighteen',
                }, {
                  path: '/test/nineteen',
                  name: 'test-nineteen',
                  component: './test/TestNineteen',
                }, {
                  path: '/test/twenty',
                  name: 'test-twenty',
                  component: './test/TestTwenty',
                }, {
                  path: '/test/twenty-one',
                  name: 'test-twenty-one',
                  component: './test/TestTwentyOne',
                },{
                  path: '/test/twenty-two',
                  name: 'test-twenty-two',
                  component: './test/TestTwentyTwo',
                },
              ],
            },
            {
              path: '/test-ts',
              name: 'test-ts',
              icon: 'crown',
              routes: [
                {
                  path: '/test-ts/one',
                  name: 'test-ts-one',
                  component: './test-ts/TestOne',
                }
              ]
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },

    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
} as IConfig;
