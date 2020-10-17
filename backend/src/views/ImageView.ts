import Image from '../models/Image';

export default {
  render(image: Image) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`
    }
  },

  renderMap(images: Image[]) {
    return images.map(images => this.render(images));
  }
}