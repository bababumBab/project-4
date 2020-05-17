### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive
# Fresh Sneakers


by [Gabriel Antonica](https://github.com/bababumBab)



## Overview

Fresh Sneakers is the app you didn't know you need IF you are a sneaker head. Most likely as a sneaker head you are trying to create a rotation of your shoes and to keep track of your collection. This is only natural. This is what Fresh Sneakers is here to 

The app was built as an individual project as part of the final project of General Assembly's Software Engineering Immersive Bootcamp. 

You can launch the app on Heroku [here](https://ehubsports.herokuapp.com/), or find the GitHub repo [here](https://github.com/bababumBab/project-4).

---
***NOTE***

The app is ready to use. You need to create an account and start adding your shoes.
The email doesn't need to be real as you won't be asked to confirm it.

---




## Table of contents
1. [Brief](#Brief)
2. [Technologies used](#Technologies-used)
3. [Approach](#Approach)
    - [Planning](#Planning)
    - [Back-end](#Back-end)
    - [Front-end](#Front-end)
    - [File Structure](#File-structure)
4. [Lessons learned](#Lessons-learned)
5. [Credit](#credit)


## Brief

* Choose to work solo or in a team
* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. 
* **Be deployed online** so it's publicly accessible.


## Technologies used
- HTML
- SCSS
- Python
- Django
- PostgreSQL
- JavaScript (ES6)
- React.js
- Webpack
- Dotenv
- Heroku
- Git and GitHub
- Trello
- Bulma
- Google Fonts
- LucidChart

## Approach

### Planning

- I wanted to create a project that reflects my personality and something that I could actually use. Not just for showcase.

- By using LucidChart I created a wireframe that helped me to plan from the start that the project will be split in two phases. I knew that I would have plenty to do and create and best way to think about an MVP and after it time allowed to move to second phase to add even more functionality to the project.

![Wireframe]()

- 


### Back-end

**Models**

- For the PostgreSQL database, I set up  the models needed for the entire project. Not only for phase 1. So I created a Sneakers Model and Plan Model. This two models will be the starting point of all the functionality needed for this app.

 ```py
class Sneaker(models.Model):
    image = models.CharField(max_length=500, blank=True, default='')
    product_code = models.CharField(max_length=50, blank=True, default='')
    collorway = models.CharField(max_length=100, blank=True, default='')
    brand = models.CharField(max_length=50)
    model_name = models.CharField(max_length=200, blank=True, default='')
    RELEASE_TYPE_CHOICES = [
        ('gr', 'General Release'),
        ('collab', 'Collaboration'),
    ]
    release = models.CharField(
      max_length=50,
        choices=RELEASE_TYPE_CHOICES,
        default='gr',
    )
    SNEAKER_TYPE = [
        ('LIFESTYLE', 'Lifestyle'),
        ('READYTOWEAR', 'Ready-to-Wear'),
        ('CASUAL', 'Casual'),
        ('BOOTS', 'Boots'),
        ('RUNNING', 'Running'),
        ('OUTDOOR', 'Outdoor'),
        ('TRAINING', 'Training'),
        ('FOOTBALL', 'Football'),
        ('BASKETBALL', 'Basketball'),
        ('TENNIS', 'Tennis'),
        ('GOLF', 'Golf'),
        ('RUGBY', 'Rugby'),
        ('WEIGHTLIFTING', 'Weightlifting'),
        ('SKATEBOARDING', 'Skateboarding'),
    ]
    sneaker_type = models.CharField(
      max_length=50,
        choices=SNEAKER_TYPE,
        default='',
    )
    date_added = models.DateField(auto_now_add=True)
    retail_price = models.DecimalField(max_digits=20, decimal_places=2, default=0,)
    purchase_price = models.DecimalField(max_digits=20, decimal_places=2, default=0,)
    collection = models.CharField(max_length=200, blank=True, default='')
    date_of_last_use = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE,)

    def __str__(self):
        return self.model_name

class Plan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,)
    date = models.DateField(auto_now_add=True)
    sneaker = models.ForeignKey(Sneaker, related_name='sneaker', on_delete=models.CASCADE)
    def __str__(self):
        return f'{self.date} - {self.sneaker}'


 ```


- For the users, I used the basic User provided by Django as for this V1.0 of the project I won't need extra customization for the user.

- For this project I haven't used an external API. Each user will be allowed to add the shoes he wants as the point is to give a platform to keep track and add accurate information about a personal collection of sneakers.

### Front-end

For my front-end I wanted to keep things as simple as possible. This app as in the time had for building it functionality prevailed in front of the styling. I used a custom animation that creates a unique background color.

In the front-end I gave the functionality of sorting the data from the backend. 

```js
getSneakers() {
    axios.get('/api/sneakers/', {
      headers: { Authorization: `Bearer ${auth.getToken()}` }
    })
      .then(response => {
        this.setState({ sneakers: response.data })
        console.log(response.data)
      })
  }

  handleClick(sneaker) {
    
    axios.get(`/api/sneakers/${sneaker.id}`)
      .then(response => {
        this.setState({ data: response.data, description: response.data.description })
        this.setState({ singleSneaker: response.data })
        this.toggleModal()
      })
  }

  handleDelete(e, sneaker) {
    e.preventDefault()
    axios.delete(`/api/sneakers/${sneaker.id}/`,{
      headers: { Authorization: `Bearer ${auth.getToken()}` }
    })
      .then(response => {
        this.getSneakers()
      })
  }

  sortShoesByDate() {
    const direction = this.state.sorted 
    let newDirection = 'desc'
     if (direction == 'desc') {
      newDirection = 'asc'
    } 
    const sorted = this.state.sneakers.slice().sort((a, b) => {
      const da = new Date(a.date_of_last_use)
      const db = new Date(b.date_of_last_use)
      if (newDirection == 'desc') {
        return db - da
      } else {
        return da - db
      }
    })

    this.setState({ sneakers: sorted, sorted: newDirection })
  }

```

### File structure

```
├── Pipfile
├── Pipfile.lock
├── Procfile
├── README.md
├── frontend
│   ├── __init__.py
│   ├── apps.py
│   ├── dist
│   │   ├── bundle.js
│   │   ├── bundle.js.map
│   │   └── index.html
│   ├── src
│   │   ├── app.js
│   │   ├── components
│   │   │   ├── AddSneaker.js
│   │   │   ├── Collection.js
│   │   │   ├── EditFormjs
│   │   │   ├── EditSneaker.js
│   │   │   ├── HomePage.js
│   │   │   ├── LoginForm.js
│   │   │   ├── Navbar.js
│   │   │   ├── Plan.js
│   │   │   ├── RegistrationForm.js
│   │   │   ├── SneakerForm
│   │   │   ├── SettingsForm.js
│   │   ├── images
│   │   │   ├── crayon-shading-gold-gradient.png
│   │   │   ├── crayon-shading-gold-gradient-light.png
│   │   │   ├── mask-dark-gradient.png
|   |   Public 
│   │   ├── index.html
│   │   ├── lib
│   │   │   ├── Auth.js
│   │   │   └── SecureRoute.js
│   │   └── styles
│   │       └── main.scss
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── jwt_auth
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── authentication.py
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── manage.py
├── package.json
├── project
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── freshSneakers
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── webpack.config.js
└── yarn.lock
```


## Potential future features

- A V2.0 is on my mind. I want to create an app that can really be marketed for the increasing collectors of sneakers. Being able to keep track of your collection, knowing how much money you have invested is part of this first phase. For V2.0 you will also be able to plan what shoes you will wear for the week ahead taking into consideration the weather.

## Lessons learned

- As seen in the section on potential future features, it was important to know in advance what features I could focus on and which to leave for a V2.0.

- Creating a strong mental model of what you want to achieve from the start can be a true lighthouse in the late hours you spend trying to create this.

- As Django helps with giving from out of the box a lot of functionality, its errors messages sometimes are not the most useful. It is therefore also necessary to specify more nuanced error information coming back from the backend to be able to trace back where things went wrong. 
