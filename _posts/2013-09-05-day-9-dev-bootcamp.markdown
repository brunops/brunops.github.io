---
layout: post
title: Day 9 - Dev Bootcamp
date: '2013-09-05T02:33:40-07:00'
categories:
- Ruby
- Metaprogramming
---
Tuesday. Superego presentation on the morning. Not that I agree with everything, but the idea of the Id, the Ego and the Superego is really interesting. After a group dynamic, what was really surprising, is that everybody seems to share lots of common confusion and doubts. It helps us to develop more empathy with each other. The main goal is to achieve awareness and learn how to deal with the little voice inside your head.

By the afternoon, while pairing, we decided to define the driver code before actually creating our classes. Which was really interesting. It prevents complexity to be added. Classes were designed to do only what they're supposed to. The focus was entirely on the behavior, on how the objects should talk to each other. It's pretty much like TDD. Really enjoyed it.

The exercises on Object Oriented Programming didn't seem so challenging today (particularly), so I could use the time to poke around with metaprogramming. It's awesome to discover how many things you can do with it. The code in the end wasn't pretty, but that's not the point, the goal was to discover how much control you have, and after that, things just start to be clearer. It gives you the feeling that you understand a bit more of that is going on in the internals of Ruby.
{% highlight ruby %}
class Person
  class << self
    def define_instance_variables(*args)
      args.each do |variable|
        # define getter method and instance variable
        self.send(:define_method, variable) do
          return instance_variable_get("@#{variable}")
        end

        # define setter method and set it's value
        self.send(:define_method, "#{variable}=") do |val|
          instance_variable_set("@#{variable}", val)
        end
      end
    end
  end
end

Person.define_instance_variables("awesome", "instance", "variables")
{% endhighlight %}

In this example, you can define any instance variables you want inside the Person class, by calling its class method `define_instance_variables`, which will programmatically define the instance variables and its getters and setters. On the fly. Pretty cool, huh!?

Not saying this is a good design, or that you should do this, just saying you can. :)
