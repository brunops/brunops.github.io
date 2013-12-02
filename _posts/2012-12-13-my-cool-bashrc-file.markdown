---
layout: post
title: Cool .bashrc File
categories:
- CLI
- Gist
- git
- Linux
---
While working in Ubuntu, I feel my bash terminal as my home. Afterall, I spend a big part of my time there, so I need it to be nicely enjoyable.

Here's my .bashrc with my own configurations. It is a collection of configurations that I've found over the interwebz, and the lastest version can be found in my <a title="latest version of my bashrc_file" href="https://gist.github.com/4108756" target="_blank">Gist</a>.

It's a tweaked version of the .bashrc found <a href="http://mediadoneright.com/content/ultimate-git-ps1-bash-prompt" target="_blank">here</a>.

I added the cowsay with the a fortune as well, so every time I open a new terminal I get a nice quote. Awesome.

![.bashrc result snapshot](/assets/images/bash_snapshot.png)

How cool is the cow?

{% highlight bash %}
#### GIT &amp;&amp; PS1
#  SETUP CONSTANTS
#  Bunch-o-predefined colors.  Makes reading code easier than escape sequences.

# Reset
Color_Off="\[\033[0m\]"       # Text Reset

# Regular Colors
Black="\[\033[0;30m\]"        # Black
Red="\[\033[0;31m\]"          # Red
Green="\[\033[0;32m\]"        # Green
Yellow="\[\033[0;33m\]"       # Yellow
Blue="\[\033[0;34m\]"         # Blue
Purple="\[\033[0;35m\]"       # Purple
Cyan="\[\033[0;36m\]"         # Cyan
White="\[\033[0;37m\]"        # White

# Bold
BBlack="\[\033[1;30m\]"       # Black
BRed="\[\033[1;31m\]"         # Red
BGreen="\[\033[1;32m\]"       # Green
BYellow="\[\033[1;33m\]"      # Yellow
BBlue="\[\033[1;34m\]"        # Blue
BPurple="\[\033[1;35m\]"      # Purple
BCyan="\[\033[1;36m\]"        # Cyan
BWhite="\[\033[1;37m\]"       # White

# Underline
UBlack="\[\033[4;30m\]"       # Black
URed="\[\033[4;31m\]"         # Red
UGreen="\[\033[4;32m\]"       # Green
UYellow="\[\033[4;33m\]"      # Yellow
UBlue="\[\033[4;34m\]"        # Blue
UPurple="\[\033[4;35m\]"      # Purple
UCyan="\[\033[4;36m\]"        # Cyan
UWhite="\[\033[4;37m\]"       # White

# Background
On_Black="\[\033[40m\]"       # Black
On_Red="\[\033[41m\]"         # Red
On_Green="\[\033[42m\]"       # Green
On_Yellow="\[\033[43m\]"      # Yellow
On_Blue="\[\033[44m\]"        # Blue
On_Purple="\[\033[45m\]"      # Purple
On_Cyan="\[\033[46m\]"        # Cyan
On_White="\[\033[47m\]"       # White

# High Intensty
IBlack="\[\033[0;90m\]"       # Black
IRed="\[\033[0;91m\]"         # Red
IGreen="\[\033[0;92m\]"       # Green
IYellow="\[\033[0;93m\]"      # Yellow
IBlue="\[\033[0;94m\]"        # Blue
IPurple="\[\033[0;95m\]"      # Purple
ICyan="\[\033[0;96m\]"        # Cyan
IWhite="\[\033[0;97m\]"       # White

# Bold High Intensty
BIBlack="\[\033[1;90m\]"      # Black
BIRed="\[\033[1;91m\]"        # Red
BIGreen="\[\033[1;92m\]"      # Green
BIYellow="\[\033[1;93m\]"     # Yellow
BIBlue="\[\033[1;94m\]"       # Blue
BIPurple="\[\033[1;95m\]"     # Purple
BICyan="\[\033[1;96m\]"       # Cyan
BIWhite="\[\033[1;97m\]"      # White

# High Intensty backgrounds
On_IBlack="\[\033[0;100m\]"   # Black
On_IRed="\[\033[0;101m\]"     # Red
On_IGreen="\[\033[0;102m\]"   # Green
On_IYellow="\[\033[0;103m\]"  # Yellow
On_IBlue="\[\033[0;104m\]"    # Blue
On_IPurple="\[\033[10;95m\]"  # Purple
On_ICyan="\[\033[0;106m\]"    # Cyan
On_IWhite="\[\033[0;107m\]"   # White

# Various variables you might want for your PS1 prompt instead
Time12h="\T"
Time12a="\@"
PathShort="\w"
PathFull="\W"
NewLine="\n"
Jobs="\j"

# cow saying your fortune (how awesome is that?)
fortune -s | cowsay

#show current project and branch
GIT_PS1_SHOWDIRTYSTATE=false

if [[ ${EUID} == 0 ]] ; then
  sq_color=$BRed
else
  sq_color=$BBlue
fi

export PS1="\n$sq_color\342\224\214\342\224\200\$([[ \$? != 0 ]] &amp;&amp; echo \"[$BRed\342\234\227$sq_color]\342\224\200\")[$IBlack\t$sq_color]\342\224\200[\[\033[01;37m\]\u$sq_color]\342\224\200[$BGreen\w$sq_color]\n$sq_color\342\224\224\342\224\200\342\224\200&gt; $BRed\$("__git_ps1") $sq_color\$ $Color_Off"

unset sq_color
{% endhighlight %}
In order to work properly, it requires git, fortune and cowsay installed.

It's easy to notice that most of the colors definition are not used at all, but I like to keep all color definitions, so I'm able to change anything whenever I feel like.
