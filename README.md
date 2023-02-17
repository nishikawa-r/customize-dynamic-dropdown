# kintone サブテーブル動的ドロップダウン&ルックアップ

サブテーブルの値を活用し動的ドロップダウンを行い、任意のサブテーブル上のフィールドの値をルックアップするカスタマイズファイルです。

[カンバンボード](https://github.com/users/nishikawa-r/projects/3/views/1?layout=board)

src/common/static.tsファイル修正方法
```
  [フィールドコード]: {
                        type: "text" or "dropdown",
                        columnLabel: [テーブルのカラム名],
                        defaultRowData: [初期値],
                        isLookUp: [ルックアップによる値取得を行うかbool値で指定 ※type:"text"のみ],
                        lookUpField: [ルックアップにて値を取得するkintone上のフィールドコード　※type:"text"&isLookUp:trueのみ],
                        lookUpTable: [ルックアップにて値を取得するkintone上のテーブル名　※type:"text"&isLookUp:trueのみ],
                        lookUpKey: [ルックアップにて値取得元のキーとなる値を持つフィールド名　※type:"text"&isLookUp:trueのみ,lookUpFieldと同じ階層にすること],
                        doLookUpchange: [ルックアップを作動させたいフィールドコードを指定　※type:"text"&isLookUp:trueのみ],
                        parent: [ドロップダウンを絞り込む際に用いる値を持つフィールドコードを指定　※type:"dropdown"のみ],
                        parentOptionCode: [ドロップダウンの値に用いるkintone上のフィールドコード　※type:"dropdown"のみ],
                        parentOptionTable: [ドロップダウンの値に用いるkintone上のテーブル名　※type:"dropdown"のみ],
                        subTitle: [サブタイトルに用いるkintone上のフィールドコードを指定 ※parentOptionCodeと同じ階層にすること],
                        app:[値取得元のアプリID　※type:"dropdown"のみ
                    }
```