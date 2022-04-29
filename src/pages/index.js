import { Button, Card, Container, Grid } from "semantic-ui-react";
import { useRouter } from 'next/router';

export default function HomPage({ tasks }) {
  const router = useRouter();
  if (tasks.length === 0) {
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ maxHeight: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no tasks yet</h1>
            <img
              src="https://i.pinimg.com/originals/78/73/af/7873af943e92375bd7668b01b33880fc.jpg"
              alt="There are no tasks yet"
            />
            <Button primary>Create your first task</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return (
    <Container style={{ padding: "20px;"}}>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card>
            <Card.Content key={task._id}>
              <Card.Header>{task.title}</Card.Header>
              <p>{task.description}</p>
            </Card.Content>
            <Card.Content entry>
              <Button primary onClick={() => router.push(`/tasks/${task._id}`)}>View</Button>
              <Button primary onClick={() => router.push(`/tasks/${task._id}/edit`)}>Edit</Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export const getServerSideProps = async (context) => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return {
    props: { tasks },
  };
};
