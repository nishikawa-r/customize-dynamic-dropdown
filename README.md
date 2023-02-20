# kintone サブテーブル動的ドロップダウン&ルックアップ

サブテーブルの値を活用し動的ドロップダウンを行い、任意のサブテーブル上のフィールドの値をルックアップするカスタマイズファイルです。

[カンバンボード](https://github.com/users/nishikawa-r/projects/3/views/1?layout=board)

# 動作例
マスタアプリ

![image](https://user-images.githubusercontent.com/102705383/220047520-22fa3e0a-3994-4d73-b3ee-f46c818d2ad4.png)

![image](https://user-images.githubusercontent.com/102705383/220047745-1853a3a8-1186-4158-a5c7-3070cb49e11b.png)

入力用アプリ

![image](https://user-images.githubusercontent.com/102705383/220047986-59b630df-05cd-47c8-b993-4280e1d4b734.png)

![image](https://user-images.githubusercontent.com/102705383/220048066-2b802523-66b9-4b2f-abc9-7d7ceed58005.png)

商品名を入力するとそれに対応するマスタのサブテーブルより値をルックアップで取得します(今回でいえば単位の値になります)
![image](https://user-images.githubusercontent.com/102705383/220048148-d7148040-b4e3-40d1-bf77-90ba40d0e984.png)

![image](https://user-images.githubusercontent.com/102705383/220048466-55f559e7-aaea-4bb7-85c6-34e18b6d50d3.png)




# 設定ファイル

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
