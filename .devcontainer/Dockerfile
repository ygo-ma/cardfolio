FROM node:lts

# Install pnpm
RUN npm install -g pnpm

# Install basic tools and setup locale
RUN apt-get update \
 && apt-get install -y sudo locales postgresql-client \
 && echo 'en_US.UTF-8 UTF-8' > /etc/locale.gen \
 && locale-gen \
 && rm -rf /var/lib/apt/lists/*

# Givet he default user a passwordless sudo
RUN echo 'node ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/node

# Switch to default user
USER node

# Install deno for supabase functions
RUN curl -fsSL https://deno.land/install.sh | sh
ENV DENO_INSTALL="/home/node/.deno"
ENV PATH="$DENO_INSTALL/bin:$PATH"
