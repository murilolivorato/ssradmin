class Errors {
  constructor () {
    this.errors = {}
  }

  // GET ERRRO
  get (field) {
    // IF IS AN ARRAY ERROR
    if (field.includes('.')) {
      const splitString = field.split('.')

      // IT IS AN ARRAY FORM  -> FORM.IMAGE_GALLERY.0.IMAGES
      if (splitString.length === 4) {
        // LARAVEL FORM ERROR
        const errorOne = this.errors[splitString[0]][splitString[1]][splitString[2] + '.' + splitString[3]]
        if (errorOne) {
          return errorOne
        }

        if (this.errors[splitString[0]][splitString[1]][splitString[2]][splitString[3]]) {
          return this.errors[splitString[0]][splitString[1]][splitString[2]][splitString[3]][0]
        }
      }

      // IT IS AN ARRAY FORM  -> FORM.IMAGE_GALLERY.IMAGES
      if (splitString.length === 3) {
        // LARAVEL FORM ERROR
        const errorOne = this.errors[splitString[0]][splitString[1] + '.' + splitString[2]]
        if (errorOne) {
          return errorOne
        }

        if (this.errors[splitString[0]][splitString[1]][splitString[2]]) {
          return this.errors[splitString[0]][splitString[1]][splitString[2]][0]
        }
      }

      // ADD ERROR INSIDE ARRAY LIST -> FORM.TITLE
      if (this.errors[splitString[0]][splitString[1]]) {
        return this.errors[splitString[0]][splitString[1]][0]
      }

      return false
    }

    // VALIDATE WITH NO FORM REFRENCE -> TITLE
    if (this.errors[field]) {
      return this.errors[field][0]
    }
  }

  record (errors, list = null) {
    if (list) {
      this.errors = [list]
      this.errors[list] = errors
      return
    }

    this.errors = errors
  }

  // RESET RECORDS
  reset () {
    this.errors = {}
  }

  // ADD  ERRORS
  addRecord (field, errorString) {
    // HAS ARRAY ERROR
    if (field.includes('.')) {
      const splitString = field.split('.')
      const listName = splitString[0]
      const fieldName = splitString[1]

      // ADD ARRAY LIST
      this.errors[listName] = Object.assign({}, this.errors[listName])

      // VALIDATE INSIDE OBJECT -> FORM.IMAGE_GALLEY.0.IMAGES
      if (splitString.length === 4) {
        // IF IS THE FIRST SEARCH
        if (!this.errors[listName][fieldName]) {
          this.errors[listName][fieldName] = {}
        }

        if (!this.errors[listName][fieldName][splitString[2]]) {
          this.errors[listName][fieldName][splitString[2]] = {}
        }

        this.errors[listName][fieldName][splitString[2]][splitString[3]] = {}
        this.errors[listName][fieldName][splitString[2]][splitString[3]] = errorString

        return
      }

      // VALIDATE INSIDE OBJECT -> FORM.IMAGE_GALLEY.IMAGES
      if (splitString.length === 3) {
        // IF IS THE FIRST SEARCH
        if (!this.errors[listName][fieldName]) {
          this.errors[listName][fieldName] = {}
        }

        this.errors[listName][fieldName][splitString[2]] = {}
        this.errors[listName][fieldName][splitString[2]] = errorString
        return
      }

      // ADD ERROR INSIDE ARRAY LIST -> FORM.TITLE
      this.errors[listName][fieldName] = errorString
      return
    }

    // VALIDATE WITH NO FORM REFRENCE -> TITLE
    this.errors = Object.assign({}, this.errors)
    this.errors[field] = errorString
  }

  /* ADD MANY ERRORS */
  addManyRecord (error) {
    this.reset()

    error.forEach((item, i) => {
      // GET ONLY THE FIRST ERROR
      /* if(i === 0) { */
      this.addRecord(item.fieldName, item.msg)
      /* } */
    })
  }

  // ANY
  any () {
    return Object.keys(this.errors).length > 0
  }

  // HAS
  has (field) {
    // IF IS AN ARRAY ERROR
    if (field.includes('.')) {
      const splitString = field.split('.')

      if ({}.hasOwnProperty.call(this.errors, splitString[0])) {
        // IT IS AN ARRAY FORM  -> FORM.IMAGE_GALLERY.0.IMAGES
        if (splitString.length === 4) {
          if ({}.hasOwnProperty.call(this.errors[splitString[0]][splitString[1]], splitString[2])) {
            // LARAVEL FORM ERROR
            const errorOne = this.errors[splitString[0]][splitString[1]][splitString[2] + '.' + splitString[3]]
            if (errorOne) {
              return errorOne
            }

            // MY FORM ERROR
            return {}.hasOwnProperty.call(this.errors[splitString[0]][splitString[1]][splitString[2]], splitString[3])
          }
          return false
        }

        // IT IS AN ARRAY FORM  -> FORM.IMAGE_GALLERY.IMAGES
        if (splitString.length === 3) {
          // LARAVEL FORM ERROR
          const errorOne = this.errors[splitString[0]][splitString[1] + '.' + splitString[2]]
          if (errorOne) {
            return errorOne
          }
          // MY FORM ERROR
          return {}.hasOwnProperty.call(this.errors[splitString[0]][splitString[1]], splitString[2])
        }

        // IT HAS FORM REFERENCE  -> FORM.TITLE
        return {}.hasOwnProperty.call(this.errors[splitString[0]], splitString[1])
      }

      return false
    }

    // DOES NOT HAVA FORM REFERENCE  -> TITLE
    return {}.hasOwnProperty.call(this.errors, field)
  }

  // CLEAR
  clear (field) {
    if (field) delete this.errors[field]

    this.errors = {}
  }

  // VERIFY ERROR AND CLEAR
  verifyErrorAndClear (field) {
    if (this.has(field)) {
      this.clearField(field)
    }
  }

  // CLEAR FIELD
  clearField (field) {
    // HAS ARRAY ERROR
    if (field.includes('.')) {
      const splitString = field.split('.')
      const listName = splitString[0]
      const fieldName = splitString[1]

      delete this.errors[listName][fieldName]
      return
    }

    delete this.errors[field]
  }
}

export default Errors
