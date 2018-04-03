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
    // TODO: Make Giphy giff
    const giphyApiKey = 'Ft0plfwoQ4IxrR0o4OC4nDb04DHAcBpg';
    const {name} = this.props;
    const giphyApi = `//api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&limit=1&offset=0&rating=G&lang=en&q=`;
    const dancingCat = '//media.giphy.com/media/YaOxRsmrv9IeA/giphy.gif';

    fetch(giphyApi + encodeURIComponent(name))
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          this.setState({
            giphyUrl: data[0].images.original.url
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

    return (
      <img src={giphyUrl} alt={this.props.name} width="200"/>
    );
  }
}

export default GiphyImage;
