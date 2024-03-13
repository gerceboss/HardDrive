# CloudiFi

## Contributing

Steps to use and contribute to this repository:

1. Clone the repository using

```bash
git clone https://github.com/gerceboss/HardDrive.git
```

or

```bash
git clone git@github.com:gerceboss/HardDrive.git
```

2. Open the terminal and VScode such that you have HardDrive as your root:

```bash
somepath/HardDrive
```

3. Check if you are on the master branch before making any commits or push to the repo using:

```bash
git branch
```

4. When you make necessary changes , execute the following set of command to push to the repository:

NOTE: DO ALL THESE WHEN YOUR ROOT DIRECTORY IS HARDDRIVE

```bash
~/HardDrive$ git add .
```

```bash
~/HardDrive$ git commit -m "your message"
```

```bash
~/HardDrive$ git push -u origin master
```

## Running the project

Steps to run this project:

1. Download metamask wallet and make an account , as well as add either `Polygon Mumbai testnet` or `Sepolia testnet` to your wallet.
   (Please google)

2. Setup the new env files as per the `.env.example` or `config.env.example` ,in the backend and the frontend separately.

3. Open the terminal and navigate to the front-end folder:

```bash
~/HardDrive$ cd front-end
```

```bash
~/HardDrive/front-end$ npm i
```

```bash
~/HardDrive/front-end$ npm run dev
```

4. Open a different terminal than the previous running terminal and navigate to the backend folder:

```bash
~/HardDrive$ cd backend
```

```bash
~/HardDrive/backend$ npm i
```

```bash
~/HardDrive/backend$ npm run start
```
