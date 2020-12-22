import React, { Component } from "react"
import { Button, Form, FormGroup, Input, Row, Col, Container, Card, CardBody, CardHeader } from "reactstrap";
import TweetEmbed from 'react-tweet-embed';
import Switch from "react-input-switch";
import API from "../utils/API";

class TwitterPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth0: this.props.user,
      id: '',
      owner: '',
      tweetBody: '',
      tweetTable: '',
      tweetArray: [],
      maxChars: 280,
      tweetChars: 0,
      tweetCharsLeft: 280,
      toggleValue: 0,
    }
  }

  onChange = (event) => {
    this.setState({
      tweetBody: event.target.value,
      tweetChars: event.target.value.length,
      tweetCharsLeft: this.state.maxChars - event.target.value.length
    })
  }

  setUserSettings = (id) => {
    API.getVendor(id)
      .then(res => {
        var data = res.data[0];
        console.log("The Data: ", data);
        this.setState({
          id: data._id,
          owner: data.owner,
          tweetBody: data.customTweet,
          tweetTable: data.tweetTable._id,
          tweetArray: data.tweetTable.tweet
        });
        this.updateCharsLeft();
      })
  }

  updateCharsLeft = () => {
    this.setState({
      tweetCharsLeft: this.state.maxChars - this.state.tweetBody.length,
    });
  }

  handleToggle = () => {
    let tempVal = this.state.toggleValue ? 0 : 1;
    this.setState({
      toggleValue: tempVal
    })
  }

  sendTweet = () => {
    API.sendTweet(this.state.tweetBody)
      .then(result => {
        console.log("Sending Tweet", result);
        const tweetObj = {
          id: this.state.tweetTable,
          tweetMongoId: result.data._id
        }
        API.saveTweet(tweetObj)
          .then(reply => {
            console.log("New Insertion To Table ", reply);
            this.setUserSettings(this.state.auth0);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  getTweets = () => {
    API.getTweet('1203448062502260737')
      .then(result => {
        console.log("Sending Tweet", result.data);
      })
      .catch(err => console.log(err));
  }

  updateCustomTweet = () => {
    let tweet = {
      id: this.state.id,
      message: this.state.tweetBody
    }
    API.updateCustomTweet(tweet)
      .catch(err => console.log(err));
  }

  // Note: add custom user tweet body from db in did mount
  componentDidMount() {
    this.setUserSettings(this.state.auth0);
    this.updateCharsLeft();
  }

  submit = (e) => {
    // e.preventDefault();
    if (this.state.toggleValue) {
      this.updateCustomTweet();
      this.sendTweet();
    }
    else {
      this.sendTweet()
    }
    // jic alert("Check Twitter");
    this.setState({ tweetBody: '' })
  }

  render() {
    return (
      <div className="twitter-post">
        <Container className="mb-3">
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <strong>Twitter Posting</strong>
                </CardHeader>
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Input
                        type="textarea"
                        name="twitter-body"
                        id="twitter-body"
                        value={this.state.tweetBody}
                        onChange={this.onChange}
                        placeholder="Insert tweet"
                      />
                      <p
                        style={{
                          textAlign: "right",
                          color: "#999",
                          fontSize: "12px"
                        }}
                      >
                        Characters Left:{" "}
                        <span
                          style={
                            this.state.tweetCharsLeft < 0
                              ? { color: "red" }
                              : {}
                          }
                        >
                          {this.state.tweetCharsLeft}
                        </span>
                      </p>
                      <Switch style={{
                        marginTop: '7px'
                      }}
                        value={this.state.toggleValue}
                        onChange={this.handleToggle}
                      />
                      <span style={{
                        marginLeft: '5px',
                        color: '#858585',
                        fontSize: '14px'
                      }}>
                        {this.state.toggleValue ? "Will save as default tweet." : "Click to save as default tweet."}
                      </span>
                    </FormGroup>
                  </Form>
                  <Button color="success" onClick={this.submit}>
                    Submit
									</Button>
                </CardBody>
              </Card>
              
              {this.state.tweetArray.map(tweet => (
                <TweetEmbed id={tweet.tweetId} />
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default TwitterPost;