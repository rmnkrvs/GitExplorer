import { StyleSheet, View, FlatList } from 'react-native';
import { Button, TextInput, Card, Text, IconButton } from 'react-native-paper';
import { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';

type Repository = {
    id: number;
    full_name: string;
    description: string | null;
    html_url: string;
};

export default function GitExplorer() {

    const [keyword, setKeyword] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(false);

    const handleFetch = () => {
        setLoading(true);
        fetch(`https://api.github.com/search/repositories?q=${keyword}`)
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);

                return response.json();
            })
            .then(data => setRepositories(data.items))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }

    const handleBrowse = async (url: string) => {
        try {
            let result = await WebBrowser.openBrowserAsync(url);
        } catch (error) {
            console.error('Error occurred while opening the browser:', error);
        }
    }

    return (
        <View style={styles.container}>

            <TextInput
                style={{ width: '90%', marginBottom: 10 }}
                label="Keyword"
                value={keyword}
                onChangeText={text => setKeyword(text)}
            />
            <Button
                loading={loading}
                mode="contained"
                icon="search-web"
                onPress={handleFetch}
            >
                Search
            </Button>

            <FlatList
                style={{ marginTop: 10, width: '90%' }}
                data={repositories}
                renderItem={({ item }) =>
                    <Card style={{ marginBottom: 10 }}>
                        <Card.Title title={item.full_name} />
                        <Card.Content>
                            <Text variant="bodyMedium">{item.description}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <IconButton icon="web" onPress={() => handleBrowse(item.html_url)} />
                        </Card.Actions>
                    </Card>
                }
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 15,
    },
});