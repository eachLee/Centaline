(function ($) {
    $.extend({
        uploadImg: function (option) {
            var $wrap = $(option.container),
                // 全局进度条
                $percent = $('<span class="progress-bar"></span>'),
                // WebUploader实例
                uploader;

            $percent.css({
                'display': 'none',
                'position': 'fixed',
                'box-sizing': 'border-box',
                'margin-top': '-15px',
                'transition': '1s',
                'top': '50%',
                'left': '25%',
                'height': '15px',
                'text-align': 'center',
                'line-height': '12px',
                'color': '#600882',
                'font-size': '12px',
                'font-weight': 'bold',
                'border': '2px dotted #eedefc',
                'background': '#ae20bdde',
                'border-radius': '15px',
                'z-index': '99999'
            });
            $(document.body).append($percent);

            // 实例化
            uploader = WebUploader.create({
                pick: {
                    id: option.container,
                    innerHTML: option.innerHTML || ''
                },
                auto: true,
                swf: 'http://cdn.staticfile.org/webuploader/0.1.0/Uploader.swf',
                chunked: false,
                chunkSize: 512 * 1024,
                threads: option.threads || 3,
                server: option.server,
                duplicate: true,
                // 支持的图片类型
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
                disableGlobalDnd: true,
                // 最多上传文件个数
                fileNumLimit: option.filesNum || 20,
                // 所有文件大小
                fileSizeLimit: (option.allSize || 200) * 1024 * 1024,    // 200 M
                // 单个文件大小
                fileSingleSizeLimit: (option.size || 20) * 1024 * 1024    // 20 M
            });

            uploader.onError = function (code) {
                console.log('into error');
                switch (code) {
                    case 'F_DUPLICATE':
                        alert('请勿上传重复文件！！！');
                        break;
                    case 'Q_EXCEED_NUM_LIMIT':
                        alert('选择文件数超出限制！最多可以上传' + (option.filesNum || 20) + '个');
                        break;
                    case 'F_EXCEED_SIZE':
                        alert('文件过大！最大可以上传' + (option.size || 20) + 'M');
                        break;
                    case 'Q_EXCEED_SIZE_LIMIT':
                        alert('文件总大小过大！最大可以上传' + (option.allSize || 200) + 'M');
                        break;
                    default:
                        alert('Eroor: ' + code);
                        break;
                }

            };
            // 多文件选择时按文件名排序
            uploader.on('filesQueued', function () {
                uploader.sort(function (a, b) {
                    if (a.name < b.name)
                        return -1;
                    if (a.name > b.name)
                        return 1;
                    return 0;
                });
            });
            uploader.on('fileQueued', function (file) {
                // 文件加入队列后触发
                // console.log(file);
            });

            uploader.on('fileDequeued', function (file) {
                // 文件移出队列后触发
                console.log(file);
            });
            uploader.on('uploadProgress', function (file, percentage) {
                console.log(file._info.width + 'x' + file._info.height);
                if (file._info.width > option.width || file._info.height > option.height) {
                    uploader.cancelFile(file);
                    alert('文件尺寸大小超出！ 宽不能超过' + option.width + 'px ' + '高不能超过' + option.height + 'px');
                } else {
                    $percent.show();
                    // $percent.html(parseInt(percentage * 100) + '%');
                    $percent.css('width', percentage * 50 + '%');
                }
                if (percentage === 1) {
                    setTimeout(function () {
                        $percent.hide().width(0);
                    }, 1000);
                }

            });
            return uploader;

        },
        //点击删除后删除队列里的文件
        webuploaderRemoveFile: function (uploadimg) {
            var imgFiles = uploadimg.getFiles('complete');
            if (imgFiles.length) {
                // 点击删除按钮之后 也删除队列里的文件 否则限制上传个数会出错
                uploadimg.removeFile(imgFiles[0]);
            }
        }
    });
}(jQuery));