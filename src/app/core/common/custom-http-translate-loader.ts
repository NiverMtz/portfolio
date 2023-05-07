import { HttpClient } from '@angular/common/http';

import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

/**
 *
 *
 * @export
 * @class CustomHttpTranslateLoader
 * @implements {TranslateLoader}
 *
 */
export class CustomHttpTranslateLoader implements TranslateLoader {
  /**
   *
   * @param _prefix Path of the folder containing the translate to consult
   * @param _suffix Belongs to the file extension to select
   */
  constructor(
    private readonly _httpClient: HttpClient,
    private _prefix: string,
    private _suffix: string
  ) {}

  /**
   *
   * @param lang Is the name of file i18n to select
   * @returns if don't find remote file this method take a local file
   * @description If want consult translate file in a server o public path.
   * Recomendation you can add url of server resource and move local consult in the catch error
   */
  getTranslation(lang: string): Observable<object> {
    const localUrl = `${this._prefix}${lang}${this._suffix}`;
    return this._httpClient.get(localUrl);
  }
}
