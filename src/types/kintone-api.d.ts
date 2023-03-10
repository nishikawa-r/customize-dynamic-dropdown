import {
    App as DefaultApp, AppID, Layout as DefaultLayout, Properties, Record as DefaultRecord, Revision
} from '@kintone/rest-api-client/lib/client/types';
import {
    Creator as DefaultCreator, OneOf as DefaultField, UserSelect as DefaultUserSelect
} from '@kintone/rest-api-client/lib/KintoneFields/types/field';
import {
    Label as DefaultLayoutLabel, OneOf as DefaultLayoutField
} from '@kintone/rest-api-client/lib/KintoneFields/types/fieldLayout';
import { OneOf as DefaultFieldProperty } from '@kintone/rest-api-client/lib/KintoneFields/types/property';

declare namespace api {
    type App = DefaultApp;
    type Field = DefaultField;
    type FieldProperty = DefaultFieldProperty;
    type FieldPropertyType = FieldProperty['type'];

    type FieldProperties = Record<string, FieldProperty>;
    type FieldEntry = [string, FieldProperty];
    type RecordData = DefaultRecord;
    type get<T> = T;

    type Layout = DefaultLayout;
    type LayoutField = DefaultLayoutField;

    namespace field {
        type Creator = DefaultCreator;
        type UserSelect = DefaultUserSelect;
        type UserEntity = Creator['value'];
    }

    namespace layout {
        type Label = DefaultLayoutLabel;
    }

    namespace response {
        type App = { readonly app?: DefaultApp; readonly fields?: FieldProperties };
        type appField = {
            properties: Properties,
            revision: string;
        }
    }
    namespace param {
        type get = {
            app: number,                         // アプリID
            fields: Array<string>,              // フィールド
            query: string,                  // 条件
            orderBy?: string,                    // 順番
            withCursor?: boolean              // カーソル有無
        }
        type getAppField = {
            app: AppID;
            fields: string[];
            revision?: Revision;
        }
    }
}
