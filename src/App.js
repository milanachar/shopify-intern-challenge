import { useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';

function App() {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();

    const params = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0
    };

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
      },
      body: JSON.stringify(params),
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      console.log(jsonResponse.choices[0].text);
    });
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <h1>OpenAI Prompts</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Prompt</Form.Label>
              <Form.Control as="textarea" placeholder="Enter prompt here" onChange={(e) => setPrompt(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
        <Row>

        </Row>
      </Container>
    </div>
  );
}

export default App;
