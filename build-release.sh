#!/bin/sh

set -eu

root_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
client_dir="$root_dir/client"
api_dir="$root_dir/api"
release_dir="$root_dir/release"
release_api_dir="$release_dir/api"
release_client_dir="$release_dir/client-dist"
wwwroot_dir="$api_dir/wwwroot"

rm -rf "$release_dir"
mkdir -p "$release_api_dir" "$release_client_dir"

npm --prefix "$client_dir" run build

rm -rf "$release_client_dir"
mkdir -p "$release_client_dir"
cp -R "$client_dir/dist/." "$release_client_dir"

rm -rf "$wwwroot_dir"
mkdir -p "$wwwroot_dir"
cp -R "$client_dir/dist/." "$wwwroot_dir"

dotnet publish "$api_dir/api.csproj" -c Release -o "$release_api_dir"

cat > "$release_dir/package.json" <<'EOF'
{
  "name": "record-manager-release",
  "private": true,
  "scripts": {
    "start": "./start.sh"
  }
}
EOF

cat > "$release_dir/start.sh" <<'EOF'
#!/bin/sh

set -eu

cd "$(dirname "$0")/api"
dotnet ./api.dll
EOF

chmod +x "$release_dir/start.sh"
