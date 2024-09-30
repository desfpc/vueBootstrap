export default {

    props: ['value', 'callback', 'url', 'fileUrl'],

    data() {
        return {
            realValue: this.value,
        }
    },

    methods: {
        onUploadFiles(event) {
            const files = event.target.files
            const formData = new FormData()
            formData.append('file', files[0])

            axios.post(this.url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                this.callback(response.data);
            })
        }
    },

    template: `<div class="col-lg-3 text-center">
      <img :src="fileUrl" class="img-thumbnail user_avatar">
      <br><input type="file" class="form-control" id="file" @change="onUploadFiles">
    </div>`
}