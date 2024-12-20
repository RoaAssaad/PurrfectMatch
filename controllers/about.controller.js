const getAboutPage = (req, res) => {
    const missionText = `
        Welcome to Purrfect Match!

        We are a group of passionate Lebanese youth dedicated to rescuing cats and providing them with a loving home. Our journey began with a shared dream to make a positive change in the world, particularly by addressing the issue of stray cats in Lebanon.

        At Purrfect Match, we strive to connect these wonderful felines with caring individuals who are ready to welcome a new member into their family. By using our platform, you're not just adopting a cat—you're participating in a larger movement to improve the lives of these animals and, hopefully, expanding our efforts to become an international service.

        We are deeply thankful to each of you who visit and use our website. Your trust in us and your shared passion for rescuing cats are what fuel our commitment to this cause. As the saying goes, "Whoever saves one life, saves the world entire." Each cat adopted is a soul saved, echoing our message to the world.

        Together, let's create a better world, one cat at a time.

        Thank you for being part of our community.

        Warm regards,

        Roa Al Assaad
        CEO and Founder, Purrfect Match
        and the Purrfect Match Team
    `;
    res.render('about', { title: 'About Us', missionText });
};

module.exports = {
    getAboutPage
};
