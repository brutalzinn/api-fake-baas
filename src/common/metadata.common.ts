import * as lodash from 'lodash';
export interface IDataItem {
  key: string;
  value: any;
}
export interface IMedatada {
  [key: string]: any;
}
export function transformDataToMetadata(data: IDataItem[]): IMedatada {
  const result: IMedatada = {};
 lodash.forEach(data, item => {
    const keys: string[] = item.key.split('.');
    const lastKey: string = lodash.last(keys) as string;
    const parentKeys: string[] = lodash.dropRight(keys);
    lodash.set(result, parentKeys, {
      ...lodash.get(result, parentKeys, {}),
      [lastKey]: item.value
    });
  });
  return result;
}

export function removeKeysFromMetadata(obj: IMedatada, keysToRemove: string[]): IMedatada {
  const result: IMedatada = lodash.cloneDeep(obj);
  keysToRemove.forEach(keyToRemove => {
    const keys = keyToRemove.split('.');
    const parentKeys = lodash.dropRight(keys);
    const lastKey = lodash.last(keys) as string;
    const nestedObj = lodash.get(result, parentKeys);
    if (nestedObj && lodash.has(nestedObj, lastKey)) {
      lodash.unset(nestedObj, lastKey);
    }
  });
  return result;
}
