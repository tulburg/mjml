import { negate, isNil } from 'lodash'
import buildPreview from './preview'
import { buildFontsTags } from './fonts'
import buildMediaQueriesTags from './mediaQueries'
import { buildStyleFromComponents, buildStyleFromTags } from './styles'

export default function skeleton(options) {
  const {
    backgroundColor = '',
    beforeDoctype = '',
    breakpoint = '480px',
    content = '',
    fonts = {},
    mediaQueries = {},
    headStyle = {},
    componentsHeadStyle = [],
    headRaw = [],
    preview,
    title = '',
    style = [],
    forceOWADesktop,
    printerSupport,
    inlineStyle,
    lang,
    dir,
  } = options

  return `${beforeDoctype ? `${beforeDoctype}\n` : ''}<!doctype html>
<html 
lang="${lang}" style="background-color: ${backgroundColor}"
dir="${dir}" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"1>
  <head>
    <title>${title}</title>
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      #outlook a { padding:0; }
      body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
      table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
      img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
      p { display:block;margin:13px 0; }
    </style>
    <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
    <!--[if lte mso 11]>
    <style type="text/css">
      .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]-->
    ${buildFontsTags(content, inlineStyle, fonts)}
    ${buildMediaQueriesTags(breakpoint, mediaQueries, {
      forceOWADesktop,
      printerSupport,
    })}
    ${buildStyleFromComponents(breakpoint, componentsHeadStyle, headStyle)}
    ${buildStyleFromTags(breakpoint, style)}
    ${headRaw.filter(negate(isNil)).join('\n')}
  </head>
  <body style="word-spacing:normal;${
    backgroundColor ? `background-color:${backgroundColor};` : ''
  }">
    ${buildPreview(preview)}
    ${content}
  </body>
</html>
  `
}
