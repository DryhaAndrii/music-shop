const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export default async function () {
    try {
        const response = await fetch(`${apiUrl}/googleAuth`, {
            method: 'GET',
            credentials: 'include', // Важно для работы с куками
        });
        const data = await response.json();
        if (data.url) {
            window.location.href = data.url; // Перенаправляем пользователя на URL аутентификации Google
        }
    } catch (error) {
        console.error('Error initiating Google auth:', error);
        // Здесь вы можете добавить обработку ошибок, например, показать сообщение пользователю
    } finally {
    }
};
