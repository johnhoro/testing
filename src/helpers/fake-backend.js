// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let createdConnectors = [
    {
      id: 'mid-x-payments',
      type: 'file_upload',
      dataType: 'rp_payments',
      name: "MID-X Payments",
      description: 'Data for razorpay payments for MID X',
      isConnected: true,
      lastRun: ""
    },
    {
        id: 'mid-x-settlements',
        type: 'file_upload',
        dataType: 'rp_settlements',
        name: "MID-X Settlements",
        description: 'Data for razorpay settlement for MID X',
        isConnected: true,
        lastRun: ""
      },
      {
        id: 'mid-x-payouts',
        type: 'file_upload',
        dataType: 'rp_payouts',
        name: "MID-X Settlement",
        description: 'Data for razorpay settlement for MID X',
        isConnected: true,
        lastRun: ""
      },
      {
        id: 'mygate_receipts',
        type: 'aws_s3',
        dataType: 'merc_payments',
        name: "Mygate receipts",
        description: 'Data for mygate receipts',
        isConnected: true,
        lastRun: "",
        config: {
            s3FolderPath: "files",
            s3AccessID: "sdsdfsdf",
            s3AccessKey: "sdsdfsdfsd",
        }
      },
      {
        id: 'mygate_payouts',
        type: 'aws_s3',
        dataType: 'merc_payouts',
        name: "Mygate payouts",
        description: 'Data for mygate consolidated payouts',
        isConnected: true,
        lastRun: "",
        config: {
            s3FolderPath: "files",
            s3AccessID: "sdsdfsdf",
            s3AccessKey: "sdsdfsdfsd",
        }
      },
  ];
let connectors = JSON.parse(localStorage.getItem('connectors')) || createdConnectors;

export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const { method, headers } = opts;
        const body = headers['Content-Type'] && headers['Content-Type'] === 'application/json' ? (opts.body && JSON.parse(opts.body)) : undefined;

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {

                if (url.endsWith('api/v1/login') && method === 'POST') {
                    return authenticate();
                }
                else if (url.endsWith('api/v1/register') && method === 'POST') { return register(); }
                else if (url.endsWith('/users') && method === 'GET') { return getUsers(); }
                else if (url.match(/\/users\/\d+$/) && method === 'DELETE') { return deleteUser(); }
                else if (url.match('api/v1/chunkUpload') && method === 'POST') { return chunkUpload(); }
                else if (url.match('api/v1/uploadComplete') && method === 'POST') { return chunkUpload(); }
                else if (url.match('api/v1/connectors') && method === 'GET') { return getConnectors(); }
                else if (url.match('api/v1/connectors') && method === 'POST') { return addConnector(); }
                else {// pass through any requests not handled above
                    return realFetch(url, opts)
                        .then(response => resolve(response))
                        .catch(error => reject(error));
                }
            }

            // route functions

            function authenticate() {
                const { email, password } = body;
                const user = users.find(x => x.email === email && x.password === password);
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    success: true,
                    message: "Login Successful",
                    token: 'fake-jwt-token'
                });
            }

            function register() {
                const user = body;

                if (users.find(x => x.email === user.email)) {
                    return error(`Username  ${user.email} is already taken`);
                }

                // assign user id and a few other properties then save
                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                return ok({});
            }

            function addConnector() {
                const connector = body;

                if (connectors.find(x => x.name === connector.name)) {
                    return error(`Connector name  ${connector.name} is already taken`);
                }

                // assign user id and a few other properties then save
                connector.id = connectors.length ? Math.max(...connectors.map(x => x.id)) + 1 : 1;
                connectors.push(connector);
                localStorage.setItem('connectors', JSON.stringify(connectors));

                return ok(connector);
            }
            function getConnectors() {
                return ok(createdConnectors);
            }

            function chunkUpload() {
                return ok({});
            }

            function getUsers() {
                if (!isLoggedIn()) return unauthorized();

                return ok(users);
            }

            function deleteUser() {
                if (!isLoggedIn()) return unauthorized();

                users = users.filter(x => x.id !== idFromUrl());
                localStorage.setItem('users', JSON.stringify(users));
                return ok();
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, json: () => Promise.resolve(body) });
            }

            function unauthorized() {
                resolve({ status: 401, json: () => Promise.resolve({ message: 'Unauthorized' })});
            }

            function error(message) {
                resolve({ status: 400, json: () => Promise.resolve({ message }) });
            }

            function isLoggedIn() {
                return headers['Authorization'] === 'Bearer fake-jwt-token';
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }
        });
    }
}