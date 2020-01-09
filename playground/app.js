import React from 'react';
import ReactDom from 'react-dom';
import { FinxosSlate, FinxosEditable } from '@Finxos/editor';
import Header from '@Finxos/components/header';
import BlockMenu from '@Finxos/components/block-menu';
import ToolBar from '@Finxos/components/toolbar';

import 'antd/dist/antd.css';
import './style.scss';
import BlockSettings from '@Finxos/blocks';
import FormatSettings from '@Finxos/formats';
import './assets/styles/reset.scss';
import './style.scss';
const content = [
  {
    type: 'paragraph',
    children: [
      // {
      //   type: 'code',
      //   children: [{
      //     type: 'paragraph',
      //     children: [{ text: 'inner paragraph' }],
      //   }],
      // },
      {
        text:
          '海客谈瀛洲，烟涛微茫信难求。越人语天姥，云霞明灭或可睹。天姥连天向天横，势拔五岳掩赤城。天台四万八千丈，对此欲倒东南倾。我欲因之梦吴越，一夜飞渡镜湖月。湖月照我影，送我至剡溪。谢公宿处今尚在，渌水荡漾清猿啼。脚著谢公屐，身登青云梯。半壁见海日，空中闻天鸡。千岩万转路不定，迷花倚石忽已暝。熊咆龙吟殷岩泉，栗深林兮惊层巅。云青青兮欲雨，水澹澹兮生烟。列缺霹雳，丘峦崩摧。洞天石扉，訇然中开。青冥浩荡不见底，日月照耀金银台。霓为衣兮风为马，云之君兮纷纷而来下。虎鼓瑟兮鸾回车，仙之人兮列如麻。忽魂悸以魄动，恍惊起而长嗟。惟觉时之枕席，失向来之烟霞。世间行乐亦如此，古来万事东流水。别君去兮何时还？且放白鹿青崖间，须行即骑访名山。安能摧眉折腰事权贵，使我不得开心颜。',
      },
    ],
  },
  {
    type: 'code',
    children: [{ text: 'outer code' }],
  },
];

class App extends React.Component {
  render() {
    return (
      <div className="editor-container">
        <FinxosSlate content={content}>
          <Header portal={document.body}>
            <BlockMenu BlockSettings={BlockSettings} />
          </Header>
          <ToolBar fromats={FormatSettings} />
          <FinxosEditable blocks={BlockSettings} formats={FormatSettings} />
        </FinxosSlate>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
