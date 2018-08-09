/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function(config) {
    config.width = '100%';
    config.easyimage_toolbar = [
        'EasyImageFull',
        'EasyImageAlignLeft',
        'EasyImageAlignCenter',
        'EasyImageAlignRight',
        'EasyImageAlt'
    ];
    config.toolbar = [
        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
        {
            name: 'basicstyles',
            items: [
                'Bold',
                'Italic',
                'Underline',
                'Strike',
                'Subscript',
                'Superscript',
                '-',
                'CopyFormatting',
                'RemoveFormat'
            ]
        },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        {
            name: 'document',
            items: ['Print', '-', 'Source', '-']
        },

        '/',
        {
            name: 'insert',
            items: [
                'EasyImageUpload',
                'Youtube',
                'Table',
                'HorizontalRule',
                'Smiley',
                'SpecialChar',
                'PageBreak'
            ]
        },

        {
            name: 'paragraph',
            items: [
                'NumberedList',
                'BulletedList',
                '-',
                'Outdent',
                'Indent',
                '-',
                'Blockquote',
                '-',
                'JustifyLeft',
                'JustifyCenter',
                'JustifyRight',
                'JustifyBlock',
                '-',
                'BidiLtr',
                'BidiRtl'
            ]
        },

        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },

        {
            name: 'clipboard',
            items: [
                'Cut',
                'Copy',
                'Paste',
                'PasteText',
                'PasteFromWord',
                '-',
                'Undo',
                'Redo'
            ]
        }
    ];
};
