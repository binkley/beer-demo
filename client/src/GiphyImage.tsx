import * as React from 'react';

interface GiphyImageProps {
  name: string;
}

interface GiphyImageState {
  giphyUrl: string;
  isLoading: boolean;
}

class GiphyImage extends React.Component<GiphyImageProps, GiphyImageState> {
  constructor(props: GiphyImageProps) {
    super(props);

    this.state = {
      giphyUrl: '',
      isLoading: false
    };
  }

  componentDidMount() {
    const giphyApiKey = 'Ft0plfwoQ4IxrR0o4OC4nDb04DHAcBpg';
    const {name} = this.props;
    const giphyApi = `//api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}`
      + `&limit=1&offset=0&rating=G&lang=en&q=${encodeURIComponent(name)}`;
    const dancingCat = '//media.giphy.com/media/YaOxRsmrv9IeA/giphy.gif';

    fetch(giphyApi)
      .then(response => response.json())
      .then(json => {
        if (json) {
          this.setState({
            giphyUrl: json.data[0].images.original.url
          });
        } else {
          this.setState({
            giphyUrl: dancingCat
          });
        }
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    const {giphyUrl, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading image...</p>;
    }

    return [
      <img key="image" src={giphyUrl} alt={this.props.name} width="200"/>
    ];
  }
}

export default GiphyImage;
