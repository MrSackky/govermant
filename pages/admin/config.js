import {
    absoluteUrl,
    checkIsLogin,
    apiInstance
} from '../../middleware/utils';

export function config(user) {

    return ({
        height: "600px",
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        uploader: {
            url: "/api/upload",
            insertImageAsBase64URI: false,
            "imagesExtensions": [
                "jpg",
                "png",
                "jpeg",
                "gif"
            ],
            prepareData: function (data) {
                if (user.type_user == 1) {
                    data.append('id', "admin"); // 

                } else {
                    data.append('id', user.organization_id); // 

                }
            },
            defaultHandlerSuccess: function (data, resp) {
                var i, field = this.options.uploader.filesVariableName;




                if (data.type === "file") {
                    console.log("success file")
                    console.log(data)
                    var textHTML = "";
                    data.list.forEach(element => {
                        var extension = "";
                        var i = element.name.lastIndexOf('.');
                        if (i > 0) {
                            extension = element.name.substring(i + 1);
                        }
                        var _path = element.path.replace("public", "");
                        if (extension == "jpg" || extension == "png" || extension == "jpeg" || extension == "gif") {
                            //your code

                            textHTML += '<img src="' + _path + '"/>'
                        } else {

                            textHTML += '<a class="file-attach" href="' + _path + '">' + element.name + '</a></br>'
                        }
                    });
                    this.selection.insertHTML(textHTML);
                } else {
                    console.log("success image")
                    console.log(data.files[0])
                    var textHTML = "";

                    // if (data.files && data.files.length) {
                    //   // for (i = 0; i < data.files.length; i += 1) {
                    //   // textHTML += '<img src="' + data.baseurl + data.files[i] + '"/>'
                    //   // console.log( data.files[i])

                    //   this.selection.insertImage(data.files[0]);
                    //   this.selection.insertHTML("</br>");

                    //   // }
                    // }
                    // this.selection.insertHTML(textHTML);

                }

                // parent.selection.insertHTML('<img src="image.png"/>');
            },
        },
        // filebrowser: {
        //   ajax: {
        //     url: "/public/uploads/c-admin/",
        //   },
        //   uploader: {
        //      url:"/api/upload"
        //   },
        // },
    });
}