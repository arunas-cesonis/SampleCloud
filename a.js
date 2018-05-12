let sampleObj = [
        {
            username: 'John',
            files:
            {
                'file1': 'industrial',
                'file2': 'barking',
                'file3': 'wind',
            }
        },
        {
            username: 'Lucy',
            files:
            {
                'file1': 'crazyWav',
                'file2': 'spooky',
                'file3': 'terminator',
            }
        },
        {
            username: 'Paul',
            files:
            {
                'file1': 'snare20',
                'file2': 'snare20',
                'file3': 'kick20',
            }
        },
    ]
const files = Object.values(sampleObj[0].files)

console.warn(files)
