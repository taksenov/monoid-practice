import {
  OUTPUT_PARAM,
  SIZE_PARAM,
  HELP_PARAM,
  SECRET_PARAM,
  INPUT_PARAM,
} from '../constants';

/**
 * Интерфейс с описанием типов возвращаемого результат
 *
 * @interface IParamsResult
 */
interface IParamsResult {
  status: boolean;
  body: string | null;
}

/**
 * Проверка параметров запуска
 *
 * @type {Class}
 * return {Object} = {status:@boolean, body:@string}
 */
class Params {
  private setParam: (c: string, p: string) => string = (
    checkParam: string,
    params: string,
  ) => {
    const checkLength = checkParam.length;
    const thisParam = params.slice(checkLength);

    return thisParam;
  };

  private checkParams: (c: string, p: string[], m: string) => IParamsResult = (
    checkParam: string,
    params: string[],
    message: string,
  ) => {
    let result: IParamsResult = { status: false, body: null };

    for (let i = 0, maxLength = params.length; i < maxLength; i++) {
      if (params[i].indexOf(checkParam) !== -1) {
        switch (checkParam) {
          case HELP_PARAM:
            return {
              status: true,
              body: message,
            };
          case SIZE_PARAM:
          case INPUT_PARAM:
          case OUTPUT_PARAM:
          case SECRET_PARAM:
            return {
              status: true,
              body: this.setParam(checkParam, params[i]),
            };

          default:
            return { status: false, body: null };
        }
      } else if (params[i].indexOf(checkParam) === -1) {
        result = { status: false, body: null };
      }
    }

    return result;
  };

  handleCheckHelpParam(
    checkParam: string,
    execParams: string[],
  ): IParamsResult {
    const obj = this.checkParams(
      checkParam,
      execParams,
      `Правила использования:
    ${OUTPUT_PARAM}PATH_NAME    -- указывается полный путь для создаваемого файла;
    ${SIZE_PARAM}               -- указывается размерность создаваемого массива;
    ${SECRET_PARAM}               -- указывается пароль для подписывания данных;
    ${HELP_PARAM}                -- справка.

    Последовательность установки параметров любая.
    Параметр '${HELP_PARAM}' имеет максимальный приоритет.
    Не документированные параметры игнорируются.`,
    );

    return obj;
  }

  handleCheckWorkParams(
    checkParam: string,
    execParams: string[],
  ): IParamsResult {
    const obj = this.checkParams(checkParam, execParams, '');

    return obj;
  }
}

export default Params;
