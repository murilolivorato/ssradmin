/**
 * Created by Murilo on 3/1/2017.
 */
class FormDisplay {
  constructor (data) {
    this.originalData = data

    for (const field in data) {
      this[field] = data[field]
    }

    this.processingForm = false
  }

  reset () {
    for (const field in this.originalData) {
      this[field] = this.originalData[field]
    }
  }

  setAll (item) {
    for (const field in this.originalData) {
      if (field in item) {
        this[field] = item[field]
      }
    }
  }

  /*  Set a value to the temp , verify if has this item and update  */
  setFillItem (item, index = null) {
    for (const field in this.originalData) {
      if (field in item) {
        this[field] = item[field]
        continue
      }

      // if is index
      if (field === 'index') {
        this[field] = index
      }
    }
  }

  get (value) {
    return this[value]
  }

  set (data, value) {
    this[data] = value
  }

  // add Index
  addIndex (value, index) {
    return Object.assign({ index: index }, value)
  }

  // Set Video Display
  setOptionDisplay (value) {
    const display = []
    let count = 0

    for (const field in value) {
      if (value[field]) {
        const valueDisplay = this.addIndex(value[field], count)
        display.push(valueDisplay)
      }

      count++
    }

    this.listOption = display
  }

  // DATA
  data () {
    const data = Object.assign({}, this)
    delete data.originalData
    delete data.processingForm

    return data
  }
}

export default FormDisplay
