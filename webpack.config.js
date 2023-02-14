// パス操作を行うためのpathモジュールをインポート
// Node.jsに標準搭載されている
const path = require('path');

// モジュールの作成
module.exports = {
    // モジュールバンドルを行うファイルの指定
    // entry内のプロパティ名がアウトプットファイル名になる（今回の場合main.jsとなる）
    entry: {
        dynamiDropdown: './src/common/dynamicDropdown.ts',
        static: './src/static/static.ts',
        'kintone-api': './src/common/kintone-api.ts',
        kucTable: './src/common/kucTable.tsx',
        index: './src/desktop/index.tsx',
    },
    // ちなみにwebpackは標準でmain.jsというファイル名でアウトプットを行うため、以下のように書き換えることも可能
    // entry: './src/ts/index.ts',

    // アウトプットディレクトリの指定
    output: {
        path: path.resolve(__dirname, 'dist', 'js'),
        filename: '[name].js',
    },

    // モジュール解決方法の設定
    resolve: {
        // モジュールとして扱いたいファイルの拡張子を省略する。
        // import { hoge } from 'Hoge'; とあった場合、Hoge.tsを読み込む。なければHoge.jsを読み込む。
        extensions: ['.ts', 'tsx', 'js'],
    },

    // モジュールに適用するルールの設定
    module: {
        // 拡張子が.tsで終わるファイルに対して、ts-loaderを適用している
        rules: [
            {
                test: [/\.ts$/, /\.tsx$/],
                loader: 'ts-loader',
            },
        ],
    },

    // 監視除外ファイルの指定
    watchOptions: {
        ignored: /node_modules/,
    },
};