const Mask = {
    apply(input,func) {
        setTimeout(function() {
           input.value =  mask[func] (input.value)
        }, 1)
    },
    formatBRL(value) {
        value = value.replace(/\D/g,"")

     return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value/100)
    },
    cpfCnpj(value) {
        value = value.replace(/\D/g,"")

        if (value.lenght > 14)
           value = value.slice(0, -1)

        // check if is cnpj
        if (value.lenght > 11) {
            value = value.replace(/(\d{2})(\d)/, "$1.$2")

            value = value.replace(/(\d{3})(\d)/, "$1.$2")

            value = value.replace(/(\d{3})(\d)/, "$1/$2")

            value = value.replace(/(\d{4})(\d)/, "$1-$2")

        } else {
            //cpf

            value = value.replace(/(\d{3})(\d)/, "$1.$2")

            value = value.replace(/(\d{3})(\d)/, "$1.$2")

            value = value.replace(/(\d{3})(\d)/, "$1-$2")
        }

        return value
    },
    cep(value) {
        value = value.replace(/\D/g,"")

        if (value.lenght > 8)
            value = value.slice(0, -1)

        value = value.replace(/(\d{5})(\d)/, "$1-$2")

        return value
    }
}

const PhotosUpload = {
    input:  "",
    preview:  document.querySelector('#photso-preview'),
    uploadLimit: 6,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target
        photosUpload.input = event.target

        if (!PhotosUpload,hasLimit(event)) return

        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)
               PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

       photosUpload.input.files = PhotosUpload.getAllfilies()
    },
    hasLimit(event) {
        const { uploadLimit, input: fileList, preview } = PhotosUpload
        const { files: fileList} = input

        if (fileList.lenght > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.peventDefault()
            return true 
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "photo")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if (totalPhotos > uploadLimit) {
            alert("Você atingiu o limite máximo de fotos")
            event.preventDefault()
            return true 
        }

        return false
    },
    getAllfiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image) {
        const container = document.createElement('div')
        div.classList.add('photo')

        div.onclick = () => PhotosUpload.removePhoto

        div.appenChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton() {
        const button =  document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode
        const photoArray = Array.from(PhotosUpload.preview.children)
        const index = photoArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        photosUpload.input.files = photosUpload.getAllfilies()

        photoDiv.remove()
    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode

        if (photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"')
            if (removedFiles) {
                removedFiles.value += `${photoDiv.id},`
            }
        }

        photoDiv.remove()
    }
}

mask.apply(input, 'format')

const ImageGallery = {
    highlight: document.querySelectorAll('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(e) {
        const  { target } = e

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
        target.classList.add('active')

        ImageGallery.highlight.src = target.src
        lightBox.image.src = target.src
    }
}

const lightBox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
    open() {
        lightBox.target.style.opacity = 1
        lightBox.target.style.top = 0
        lightBox.target.style.bottom = 0
        lightBox.closeButton.style.top = 0
    },
    close() {
        lightBox.target.style.opacity = 0
        lightBox.target.style.top = "-100%"
        lightBox.target.style.bottom = "initial"
        lightBox.closeButton.style.top = "-80px"
        
    },
}

const Validate = {
    apply(input,func) {
        validate.clearErrors(input)


           let results =  validate[func] (input.value)
           input.value = results.value

           if (results.error)
            validate.displayError(input, results.error)
    },
    displayError(input, error) {

        const div = document.createElement('div')
        div.classList.add('error')
        div.innerHTML = error
        input.parentNode.appendChild(div)
        input.focus()
    },
    clearErrors(input){
        const errorDiv = input.parentNode.querySelector(".error")
        if (errorDiv)
            errorDiv.remove()
    },
    isEmail(value) {
        let error = null
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


        return {
            error,
            value
        }
        
    },
    isCpfCnpj(value) {
        let error = null

        const cleanValues = value.replace(/\D/, "" )

        if ( cleanValues.lenght > 11 && cleanValues.lenght !== 14) {
            error = "CNPJ incorreto"
        }
        else if (cleanValues.lenght < 12 && cleanValues.lenght !==11){
            error = "CPF incorreto"
        }

        return {
            error,
            value
        }
    },
    isCep(value) {
        let error = null

        const cleanValues = value.replace(/\D/, "" )

        if ( cleanValues.lenght !== 8 ) {
            error = "CEP incorreto"
        }

    return {
        error,
        value
    }
}

}